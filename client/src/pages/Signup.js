import React, { useState, useEffect, useRef } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import "./Site.css";
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
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, ThemeProvider } from "@material-ui/core";
import useStyles from "../assets/Style.js";

import usePlacesAutocomplete from 'use-places-autocomplete'
process.env.GOOGLE_API_KEY = 'AIzaSyDX7OfXArTUapg24Bmi44PlxXMEBvLs_tM';

function Signup(props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState(props.location.email);
  const [password, changePassword] = useState("");
  const [birthplace, changeBirthplace] = useState("");
  const [redirect, setRedirect] = useState(false);

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
  

  //Auto
  //const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions
    } = usePlacesAutocomplete({
      requestOptions:  { types: ['(cities)'] },
      debounce: 300
    });
    const ref = useRef();
    // useOnclickOutside(ref, () => {
    //   // When user clicks outside of the component, we can dismiss
    //   // the searched suggestions by calling this method
    //   clearSuggestions();
    // });
  
    const handleInput = e => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect = ({ description }) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter as "false"
      setValue(description, false);
      changeBirthplace(description);
      clearSuggestions();
  
      // // Get latitude and longitude via utility functions
      // getGeocode({ address: description })
      //   .then(results => getLatLng(results[0]))
      //   .then(({ lat, lng }) => {
      //     console.log('📍 Coordinates: ', { lat, lng });
      //   }).catch(error => {
      //     console.log('😱 Error: ', error)
      //   });
    };
  
    const renderSuggestions = () =>
      data.map(suggestion => {
        const {
          id,
          structured_formatting: { main_text, secondary_text }
        } = suggestion;
  
        return (
          <li
            key={id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    

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
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="MM/dd/yyyy"
                  label="Date of Birth"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  autoOk
                  label="Time of Birth"
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={11}>
              <div ref={ref}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Birthplace"
                  value={value}
                  onChange={(e) => handleInput(e)}
                  disabled={!ready}
                  // onChange={e => {
                  //   changeBirthplace(e.target.value);
                  // }}
                />
                {status === 'OK' && <ul>{renderSuggestions()}</ul>}
              </div>
            

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
//PlacesAutocomplete();
//};

export default Signup;
