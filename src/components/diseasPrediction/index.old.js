import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import { getDiseasesListRef, allDiseasesSymptomRef } from "../database";
import Chip from "@material-ui/core/Chip";
import { withSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function DiseasPrediction(props) {
  const classes = useStyles();
  //
  var allDiseases = [];
  const [patientSymptoms, setPatientSymptoms] = useState([]);
  const [selectableSiseases, setSelectableSiseases] = useState([]);
  //

  useEffect(() => {
    getAllDeseases();
    getAllSelectableDeseases();
  }, []);

  const getAllDeseases = () => {
    getDiseasesListRef.get().then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      // set empty at first
      allDiseases = [];
      for (var item in snapshot.data()) {
        console.log("keys: " + item + " value: ", snapshot.get(item));
        allDiseases.push({
          value: snapshot.get(item).name,
          label: snapshot.get(item).label,
        });
      }
    });
  };

  const getAllSelectableDeseases = () => {
    const ref = sortedRef();
    ref.get().then((snapshots) => {
      if (snapshots.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshots.forEach((item) => {
        console.log("SHOW symptoms:", item.data().symptoms);
        var tmpSelectable = [];
        for (var symptom in item.data().symptoms) {
          const isExist = checkIfSymptomExist(tmpSelectable, symptom);

          if (!isExist) {
            const newItem = getSympData(symptom);
            if (newItem) {
              tmpSelectable.push(newItem[0]);
            }
          }
        }
        setSelectableSiseases(tmpSelectable);
      });
    });
  };

  const getSympData = (value) => {
    return allDiseases.filter((item) => {
      if (item.value === value) {
        return item;
      }
    });
  };
  const checkIfSymptomExist = (tmpArray, value) => {
    for (var i = 0; i < tmpArray.length; i++) {
      if (tmpArray[i].value === value) {
        return true;
      }
    }
    return false;
  };

  const sortedRef = () => {
    const symptomArray = [];

    patientSymptoms.map((item) => {
      symptomArray.push(item.value);
    });

    var tmpRef = allDiseasesSymptomRef;
    for (var i = 0; i < symptomArray.length; i++) {
      console.log(`SHOW symptoms.${symptomArray[i]}`);
      tmpRef = tmpRef.where(`symptoms.${symptomArray[i]}`, "==", true);
    }

    return tmpRef;
  };

  const setAllDiseasesFromArray = () => {};

  const addSymptom = (val) => {
    if (val) {
      console.log("value: ", val);
      setPatientSymptoms((previous) => [...previous, val]);
      getAllSelectableDeseases();
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
              addSymptom({
                value: option.value,
                label: option.label,
              });
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
