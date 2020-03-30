import React, { useState } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import "./Signup.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: "#D74C3D"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(5, 0, 3),
    backgroundColor: "#396384"
  },
  ok: {
    backgroundColor: "white",
    borderRadius: "5%"
  }
}));

function Signup(props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState(props.location.email);
  const [birthplace, changeBirthplace] = useState("");
  const [password,changePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [profileInfo, setProfileInfo] = useState();
  async function signupRequest(e) {
    e.preventDefault();
    let info = {
      email: email,
      password: password,
      name: name,
      address: birthplace,
      birthday: Math.floor(selectedDate.getTime() / 1000)
    };
    let response = await axios.post("/api/signup", info)
    if (response.status === 200) {
      const loginInfo = {
        username: email,
        password: password
      }
      signInRequest(loginInfo, setProfileInfo.bind(this), setRedirect.bind(this));
    }
  }
  if (redirect) {
    return (
      <Redirect to={{ pathname: "/Temp", state: { data: profileInfo } }} />
    );
  }
  return (
    <Container component="main" maxWidth="xs" className={classes.ok}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          We just need a few more things
        </Typography>
        <form
          className={classes.form}
          validate
          onSubmit={e => signupRequest(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                fullWidth
                label="First Name"
                autoFocus
                value={name}
                onChange={e => {
                  changeName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={e => {
                  changeEmail(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                autoComplete="8 characters min"
                value={password}
                onChange={e => {
                  changePassword(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="MM/dd/yyyy"
                  label="Date of Birth"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  autoOk
                  label="Time of Birth"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Birthplace"
                value={birthplace}
                onChange={e => {
                  changeBirthplace(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
