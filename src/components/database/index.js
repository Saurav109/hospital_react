import firebase from "../../fire";
//
const errorMessage = "somthings wrong, try again!";
const environment = "dev";
// const environment = "live";

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

export const getSelectAbleSymptomArray = (allDiseases, ref, then) => {
  ref.get().then((snapshots) => {
    if (snapshots.empty) {
      console.log("No matching documents.");
      return;
    }
    var tmpSelectable = [];

    snapshots.forEach((item) => {
      console.log("parse doc: ", item.id);
      for (var symptom in item.data().symptoms) {
        console.log(`doc id: ${symptom}`);
        tmpSelectable.push(getSympData(allDiseases, symptom)[0]);
      }
      then(tmpSelectable);
      //   const isExist = checkIfSymptomExist(tmpSelectable, symptom);

      //   if (!isExist) {
      //     const newItem = getSympData(allDiseases, symptom);
      //     if (newItem) {
      //       tmpSelectable.push(newItem[0]);
      //       console.log("new symptom: ", newItem[0]);
      //     }
      //   }
      // }
    });
  });
};
