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
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {withSnackbar} from "notistack";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from '@material-ui/core/MenuItem';

const genders = [
    {
        value: 'MALE',
        label: 'male'
    }, {
        value: 'FEMALE',
        label: 'female'
    }, {
        value: 'OTHER',
        label: 'other'
    }
];
function CreateAccount() {
    const classes = useStyles();
    const [name, setName] = React.useState('MALE');
    const [email, setEmail] = React.useState('MALE');
    const [password, setPassword] = React.useState('MALE');


    const [gender, setCurrency] = React.useState('MALE');


    const handleChange = (event) => {
        setCurrency(event.target.value);
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={
                classes.paper
            }>
                <Avatar className={
                    classes.avatar
                }>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={
                        classes.form
                    }
                    noValidate>
                    <Grid container
                        spacing={2}>

                        <Grid item
                            xs={12}>
                            <TextField variant="outlined" required fullWidth label="Name"/>
                        </Grid>

                        <Grid item
                            xs={12}>
                            <TextField variant="outlined" required fullWidth label="Email Address" name="email" autoComplete="email"/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField variant="outlined" required fullWidth label="Location"/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField variant="outlined" required fullWidth label="Age" type="number"/>
                        </Grid>


                        <Grid item
                            xs={12}>
                            <TextField variant="outlined" select label="Gender" required fullWidth
                                value={gender}
                                onChange={handleChange}
                                helperText="Please select your ">
                                {
                                genders.map((option) => (
                                    <MenuItem key={
                                            option.value
                                        }
                                        value={
                                            option.value
                                    }>
                                        {
                                        option.label
                                    } </MenuItem>
                                ))
                            } </TextField>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField InputProps={
                                    {
                                        startAdornment: <InputAdornment position="start">+88</InputAdornment>
                                    }
                                }
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Phone number"/>
                        </Grid>
                    <Grid item
                        xs={12}>
                        <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" autoComplete="current-password"/>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <TextField variant="outlined" required fullWidth name="password" label="Confirm password" type="password" autoComplete="current-password"/>
                    </Grid>

                    <Grid item
                        xs={12}>
                        <FormControlLabel control={
                                <Checkbox
                            value="allowExtraEmails"
                            color="primary"/>
                            }
                            label="I agree all terms and conditions"/>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary"
                    className={
                        classes.submit
                }>
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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default withSnackbar(CreateAccount);
