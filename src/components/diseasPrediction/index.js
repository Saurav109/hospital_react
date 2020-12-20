import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import {
  getDiseasesListRef,
  allDiseasesSymptomRef,
  getAllDiseasesSymptomArray,
  getSelectAbleSymptomArray,
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
    this.state = { patientSymptoms: [], selectableDiseases: [] };
    getAllDiseasesSymptomArray((array) => {
      this.allDiseases = array;
      this.setState({ selectableDiseases: this.allDiseases });
    });
  }

  addSymptom = (val) => {
    if (val) {
      this.setState({ patientSymptoms: [...this.state.patientSymptoms, val] });

      getSelectAbleSymptomArray(
        this.allDiseases,
        this.sortedRef(),
        (selectable) => {
          console.log("selectable array: ", selectable);
        }
      );
    } else {
      this.props.enqueueSnackbar("please select a symptom", {
        variant: "error",
      });
    }
  };
  sortedRef = () => {
    var tmpRef = allDiseasesSymptomRef;
    if (this.state.patientSymptoms.length == 0) {
      return tmpRef;
    }
    const symptomArray = [];

    this.state.patientSymptoms.map((item) => {
      symptomArray.push(item.value);
    });

    for (var i = 0; i < symptomArray.length; i++) {
      tmpRef = tmpRef.where(`symptoms.${symptomArray[i]}`, "==", true);
    }

    return tmpRef;
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
          Select a symptom from bellow
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
  handleDelete = (value) => {
    const newPatientSymptoms = this.state.patientSymptoms.filter(function (
      obj
    ) {
      return obj.value !== value;
    });

    this.setState({ patientSymptoms: newPatientSymptoms });
    this.props.enqueueSnackbar("symptom deleted", {
      variant: "success",
    });
  };
}

export default withSnackbar(DiseasPrediction);
