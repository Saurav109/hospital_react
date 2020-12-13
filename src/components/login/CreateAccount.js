import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withSnackbar } from "notistack";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
//firebase
import { signUp } from "../database";
//redux
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/actions";

function CreateAccount(props) {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState("MALE");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const [termsAndCondition, setTermsAndCondition] = React.useState(false);

  const createAccountCall = () => {
    dispatch(startLoading());
    signUp(
      email,
      password,
      {
        name,
        email,
        location,
        age,
        gender,
        phoneNumber,
      },
      () => {
        dispatch(stopLoading());
        props.enqueueSnackbar("Created a new account!", {
          variant: "success",
        });
      },
      (error) => {
        props.enqueueSnackbar(error, {
          variant: "error",
        });
      }
    );
  };

  const validateInputs = (e) => {
    e.preventDefault();
    console.log(
      ` name: ${name}\n email: ${email}\n loaction: ${location}\n age: ${age}\n gender: ${gender}\n phoneNumber: ${phoneNumber}\n password: ${password}\n passwordAgain: ${passwordAgain}\n terms & condi: ${termsAndCondition}`
    );

    if (!termsAndCondition) {
      props.enqueueSnackbar(
        "You have to accept terms and condition in order to use our web",
        {
          variant: "error",
        }
      );
      return;
    }

    if (
      name &&
      email &&
      location &&
      age &&
      gender &&
      phoneNumber &&
      password &&
      passwordAgain
    ) {
      if (passwordAgain === password) {
        createAccountCall();
      } else {
        props.enqueueSnackbar("Password didn't match up", {
          variant: "success",
        });
      }
    } else {
      props.enqueueSnackbar("Please enter everything", {
        variant: "error",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoComplete="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Location"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                value={location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Age"
                type="number"
                onChange={(event) => {
                  setAge(event.target.value);
                }}
                value={age}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                select
                label="Gender"
                required
                fullWidth
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
                helperText="Please select your "
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}{" "}
                  </MenuItem>
                ))}{" "}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+88</InputAdornment>
                  ),
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Phone number"
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                value={phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm password"
                type="password"
                autoComplete="password"
                onChange={(event) => {
                  setPasswordAgain(event.target.value);
                }}
                value={passwordAgain}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    color="primary"
                    checked={termsAndCondition}
                    onChange={(event) => {
                      setTermsAndCondition(event.target.checked);
                    }}
                  />
                }
                label="I agree all terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={validateInputs}
          >
            Create account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const genders = [
  {
    value: "MALE",
    label: "male",
  },
  {
    value: "FEMALE",
    label: "female",
  },
  {
    value: "OTHER",
    label: "other",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default withSnackbar(CreateAccount);
