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

function DiseasPrediction(props) {
  const classes = useStyles();
  var allDiseases = [];
  const [patientSymptoms, setPatientSymptoms] = useState([]);
  const [selectableSiseases, setSelectableSiseases] = useState([]);

  useEffect(() => {
    getAllDiseasesSymptomArray((array) => {
      allDiseases = array;
      setSelectableSiseases(allDiseases);
    });

    getSelectAbleSymptomArray(allDiseases, sortedRef(), (selectAble) => {
      // console.log("XX selectAble : ", selectAble);
      setSelectableSiseases(selectAble);
    });
  }, [patientSymptoms]);

  const updateData = () => {
    getAllDiseasesSymptomArray((array) => {
      allDiseases = array;
      setSelectableSiseases(allDiseases);
      // getSelectAbleSymptomArray(allDiseases, sortedRef(), (selectAble) => {
      //   console.log("XX selectAble : ", selectAble);
      //   setSelectableSiseases(selectAble);
      // });
    });
    sortedRef()
      .get()
      .then((snapshots) => {
        if (snapshots.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshots.forEach((item) => {
          console.log("SHOW doc:", item.id);
        });
      });
  };

  const sortedRef = () => {
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

  const addSymptom = (val) => {
    if (val) {
      setPatientSymptoms((previous) => [...previous, val]);
    } else {
      props.enqueueSnackbar("please select a symptom", {
        variant: "error",
      });
    }
  };
  const handleDelete = (value) => {
    const newPatientSymptoms = patientSymptoms.filter(function (obj) {
      return obj.value !== value;
    });
    setPatientSymptoms(newPatientSymptoms);
    props.enqueueSnackbar("symptom deleted", {
      variant: "success",
    });
  };

  console.log("selectableSiseases size: ", selectableSiseases);
  return (
    <div>
      <Typography variant="h4" component="h2">
        Diseas Prediction
      </Typography>

      {patientSymptoms.length > 0 && (
        <Typography className={classes.text} variant="h6" component="h2">
          Your symptoms
        </Typography>
      )}

      {patientSymptoms.map((item) => (
        <Chip
          className={classes.chip}
          key={item.value}
          label={item.label}
          onDelete={() => {
            handleDelete(item.value);
          }}
          color="primary"
        />
      ))}

      <Typography className={classes.text} variant="h6" component="h2">
        Select a symptom from bellow
      </Typography>
      <TextField select label="Symptoms" variant="filled" required fullWidth>
        {selectableSiseases.map((option) => (
          <MenuItem
            key={option.value}
            value={option.label}
            onClick={() => {
              addSymptom(option);
            }}
          >
            {option.label}{" "}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  text: {
    margin: theme.spacing(1),
  },
}));

export default withSnackbar(DiseasPrediction);
