import React, { useState, useEffect } from "react";
import { signInRequest } from "../helpers/loginFunction.js"
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
import { Card, Checkbox, FormControlLabel } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import useStyles from "../assets/Style.js";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

function Signup(props) {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date("2018-01-01T17:00:00.000Z"));
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState(props.location.email);
  const [password, changePassword] = useState("");
  const [birthplace, changeBirthplace] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [noDate, setNoDate] = useState(false)

  const handleNoDateChange = (event) => {
    setNoDate(event.target.checked);
    setTime(new Date("2018-01-01T17:00:00.000Z"));
  };

  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDX7OfXArTUapg24Bmi44PlxXMEBvLs_tM&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  useEffect(() => {
    getInfo();
  }, []);
  async function getInfo() {
    let response = await axios.get("/api/getUserInfo");
    if (response.data) setRedirect(true);

  }

  async function signupRequest(e) {
    e.preventDefault();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    console.log(time);

    let info = {
      email: email,
      password: password,
      name: name,
      address: birthplace,
      birthday: Math.floor((date.getTime() / 1000) + (((time.getHours() * 60) + time.getMinutes()) * 60 + time.getSeconds())),
      timezoneOffset: (new Date()).getTimezoneOffset()
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

  const handleChange = (value) => {
    changeBirthplace(value);
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );


  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (birthplace === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: birthplace, types: ['(cities)'] }, (results) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [birthplace, fetch]);

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
                  value={date}
                  onChange={date => setDate(date)}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  
                  label="Time of Birth"
                  mask="__:__ _M"
                  value={time}
                  onChange={date => setTime(date)}
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
                    onChange={handleNoDateChange}
                  />
                }
                label="No time of birth"
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                id="google-map-demo"
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                onInputChange={ (e, val) => handleChange(val) }
                includeInputInList
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Birthplace"
                    required
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderOption={(option) => {
                  const matches = option.structured_formatting.main_text_matched_substrings;
                  const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                  );

                  return (
                    <Grid container alignItems="center">
                      <Grid item>
                        <LocationOnIcon className={classes.icon} />
                      </Grid>
                      <Grid item xs>
                        {parts.map((part, index) => (
                          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                          </span>
                        ))}

                        <Typography variant="body2" color="textSecondary">
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
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
//PlacesAutocomplete();
//};

export default Signup;
