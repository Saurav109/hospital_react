import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import {
  getDiseasesListRef,
  allDiseasesSymptomRef,
  getAllDiseasesSymptomArray,
  getSelectAbleSymptomArray,
  defaultMessage,
} from "../database";
import Chip from "@material-ui/core/Chip";
import { withSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  text: {
    margin: theme.spacing(1),
  },
}));

class DiseasPrediction extends React.Component {
  allDiseases = [];
  constructor(props) {
    super(props);
    this.state = {
      patientSymptoms: [],
      selectableDiseases: [],
      messages: defaultMessage,
      details: "",
    };

    // initial get all diseases array
    getAllDiseasesSymptomArray((array) => {
      this.allDiseases = array;
      this.setState({ selectableDiseases: this.allDiseases });
    });
  }

  addSymptom = (val) => {
    if (val) {
      var newPatientSymptoms = [...this.state.patientSymptoms, val];
      this.updateValues(newPatientSymptoms);
    }
  };

  updateValues = (patientSymptoms) => {
    getSelectAbleSymptomArray(
      this.allDiseases,
      patientSymptoms,
      this.sortedRef(patientSymptoms),
      (messages, details) => {
        if (messages) {
          this.setState({ messages: messages });
        } else {
          this.setState({ messages: defaultMessage });
        }

        if (details) {
          this.setState({ details: details });
        } else {
          this.setState({ details: "" });
        }
      },
      (newSelectable) => {
        this.setState({
          selectableDiseases: newSelectable,
          patientSymptoms: patientSymptoms,
        });
      }
    );
  };
  sortedRef = (patientSymptoms) => {
    var tmpRef = allDiseasesSymptomRef;
    if (patientSymptoms.length == 0) {
      return tmpRef;
    }
    const symptomArray = [];

    patientSymptoms.map((item) => {
      symptomArray.push(item.value);
    });

    for (var i = 0; i < symptomArray.length; i++) {
      tmpRef = tmpRef.where(`symptoms.${symptomArray[i]}`, "==", true);
    }

    return tmpRef;
  };

  handleDelete = (value) => {
    const newPatientSymptoms = this.state.patientSymptoms.filter(function (
      obj
    ) {
      return obj.value !== value;
    });

    this.updateValues(newPatientSymptoms);
    this.props.enqueueSnackbar("symptom deleted", {
      variant: "success",
    });
  };
  render() {
    const classes = makeStyles((theme) => ({
      chip: {
        margin: theme.spacing(0.5),
      },
      text: {
        margin: theme.spacing(1),
      },
    }));
    return (
      <div>
        <Typography variant="h4" component="h2">
          Diseas Prediction
        </Typography>

        {this.state.patientSymptoms.length > 0 && (
          <Typography className={classes.text} variant="h6" component="h2">
            Your symptoms
          </Typography>
        )}

        {this.state.patientSymptoms.map((item) => (
          <Chip
            className={classes.chip}
            key={item.value}
            label={item.label}
            onDelete={() => {
              this.handleDelete(item.value);
            }}
            color="primary"
          />
        ))}

        <Typography className={classes.text} variant="h6" component="h2">
          {this.state.messages}
        </Typography>
        <Typography className={classes.text} variant="body1" component="h2">
          {this.state.details}
        </Typography>

        <TextField select label="Symptoms" variant="filled" required fullWidth>
          {this.state.selectableDiseases.map((option) => (
            <MenuItem
              key={option.value}
              value={option.label}
              onClick={() => {
                this.addSymptom(option);
              }}
            >
              {option.label}{" "}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withSnackbar(DiseasPrediction);
