import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../../fire";
import { useState } from "react";
import { withSnackbar } from "notistack";

function ForgatePassword(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const resetPassCall = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        props.enqueueSnackbar("Done, please check your email", {
          variant: "success",
        });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        props.enqueueSnackbar(errorMessage, {
          variant: "error",
        });

        props.enqueueSnackbar("failed", {
          variant: "error",
        });
      });
  };

  const validateInput = (e) => {
    e.preventDefault();
    if (!email) {
      props.enqueueSnackbar("Please enter email", {
        variant: "error",
      });
    } else {
      resetPassCall();
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
          Reset password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={validateInput}
          >
            Send reset email
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                Or back to login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default withSnackbar(ForgatePassword);
