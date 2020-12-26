import firebase from "../../fire";
//
const errorMessage = "somthings wrong, try again!";
const environment = "dev";
// const environment = "live";

export const logoutFirebase = () => {
  firebase.auth().signOut();
};

export const loadProfileData = (then, error) => {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    firebase
      .firestore()
      .collection("/root/dev/users/")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          then(snapshot.data());
        } else {
          console.log("snapshot not defined");
        }
      });
  } else {
    error(errorMessage);
  }
};

export const signUp = (email, password, values, then, errorCall) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      if (user) {
        setupProfileVal(values, then);
      } else {
        errorCall(errorMessage);
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      errorCall(errorMessage);
    });
};

export const setupProfileVal = (values, then) => {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    firebase
      .firestore()
      .collection("root")
      .doc(environment)
      .collection("users")
      .doc(uid)
      .set(values)
      .then(then);
  } else {
    then(errorMessage);
  }
};

export const getDiseasesListRef = firebase
  .firestore()
  .doc("/root/dev/symptoms/symptomList");

export const allDiseasesSymptomRef = firebase
  .firestore()
  .collection("/root/dev/diseases");

export const getAllDiseasesSymptomArray = (then) => {
  getDiseasesListRef.get().then((snapshot) => {
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    // set empty at first
    var allDiseases = [];
    for (var item in snapshot.data()) {
      // console.log("keys: " + item + " value: ", snapshot.get(item));
      allDiseases.push({
        value: snapshot.get(item).name,
        label: snapshot.get(item).label,
      });
    }
    then(allDiseases);
  });
};
const checkIfSymptomExist = (tmpArray, value) => {
  if (tmpArray.length == 0) {
    return false;
  }
  for (var i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i].value === value) {
      return true;
    }
  }
  return false;
};

const getSympData = (allDiseases, value) => {
  return allDiseases.filter((item) => {
    if (item.value === value) {
      return item;
    }
  });
};

export const defaultMessage = "Select a symptom from bellow";
export const getSelectAbleSymptomArray = (
  allDiseases,
  patientSelectable,
  ref,
  setMessages,
  then
) => {
  ref.get().then((snapshots) => {
    if (snapshots.empty) {
      console.log("No matching documents.");
      return;
    }

    const matchUpDiseasses = snapshots.size;
    console.log("snapshot lenght: ", matchUpDiseasses);

    if (patientSelectable.length > 1) {
      if (matchUpDiseasses > 10) {
        setMessages(
          "Keep selecting your symptom, your symptom matchup over 10 diseasses"
        );
      } else if (matchUpDiseasses > 5) {
        setMessages(
          "Keep selecting your symptom, your symptom matchup over 5 diseasses"
        );
      } else if (matchUpDiseasses > 1) {
        setMessages("almost there, your symptom matchup over 1 diseasses");
      }
    } else {
      // not enough data
      setMessages(
        "Keep slecting your symptoms, We predict utill you have put 3 symptoms and atleast match up with one diseas"
      );
    }

    var tmpSelectable = [];

    snapshots.forEach((item) => {
      console.log("parse doc: ", item.id);
      for (var symptom in item.data().symptoms) {
        if (matchUpDiseasses == 1 && patientSelectable.length > 2) {
          setMessages(
            `Our system predicted that you may have ${item.data().name}`,
            item.data().details
          );
        }

        console.log(`doc id: ${symptom}`);
        const isExistInSelectableArray = checkIfSymptomExist(
          tmpSelectable,
          symptom
        );
        const isExistInPatientSymptomArray = checkIfSymptomExist(
          patientSelectable,
          symptom
        );

        if (!isExistInSelectableArray) {
          if (!isExistInPatientSymptomArray) {
            const newItem = getSympData(allDiseases, symptom);
            if (newItem) {
              tmpSelectable.push(newItem[0]);
              console.log("new symptom: ", newItem[0]);
            }
          }
        }
      }
      then(tmpSelectable);
    });
  });
};
