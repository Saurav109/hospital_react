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
