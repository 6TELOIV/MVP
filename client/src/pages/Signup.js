import React, { useState, useEffect } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import "./Site.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card } from "@material-ui/core";
import useStyles from "../assets/Style.js"
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Signup(props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState("2018-01-01T17:00:00.000Z");
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState(props.location.email);
  const [password, changePassword] = useState("");
  const [birthplace, changeBirthplace] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [noDate, setDateUsage] = useState(false)
  const handleChange = (event) => {
    setDateUsage(event.target.checked);
    handleTimeChange("2018-01-01T17:00:00.000Z");
  };

  useEffect(()=>{
      getInfo();
  },[]);
  async function getInfo(){
      let response = await axios.get("/api/getUserInfo");
      if(response.data) setRedirect(true);
      
  }

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
      signInRequest(loginInfo, setRedirect.bind(this));
    }
  }
  if (redirect) {
    return (
      <Redirect to={{ pathname: "/UserDashboard" }} />
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.paper}>
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
                autoComplete="password"
                value={password}
                type="password"
                onChange={e => {
                  changePassword(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableFuture
                  openTo="year"
                  format="MM/dd/yyyy"
                  label="Date of Birth"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={date => handleDateChange(date)}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  
                  label="Time of Birth"
                  mask="__:__ _M"
                  value={selectedTime}
                  onChange={date => handleTimeChange(date)}
                  fullWidth
                  disabled={noDate}
                />
              </MuiPickersUtilsProvider>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noDate}
                    value="allowExtraEmails" 
                    color="primary" 
                    onChange={handleChange}
                  />
                }
                label="No time of birth"
              />
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

            <Grid item xs={12}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Sign Up
              </Button>
            </Grid>
            
          </Grid>

        </form>
      </Card>
    </Container>
  );
}

export default Signup;
