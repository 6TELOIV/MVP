import React, { useState, useEffect } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import "./Site.css";
import { Card } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "../assets/Style.js";
import axios from "axios";

function Login(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  useEffect(()=>{
      getInfo();
  },[]);
  async function getInfo(){
      let response = await axios.get("/api/getUserInfo");
      if(response.data) setRedirect(true);
      
  }
  
  async function signIn(e) {
    e.preventDefault();
    setWrongPass(false);
    signInRequest({username: email, password: password}, setRedirect.bind(this), setWrongPass.bind(this));
  }

  if (redirect) {
    return (
      <Redirect to={{ pathname: "/UserDashboard"}} />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5" align="center">
          Welcome Back
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => signIn(e)}
        >
          <Grid container spacing={2}>
          {wrongPass && 
          <Grid item xs={12}>
            <p align="center" style={{color: 'red'}}>
              Incorrect username/password combo
            </p>
          </Grid>}


          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              autoComplete="email"
              required
              onChange={e => {
                changeEmail(e.target.value);
              }}
            />
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              autoComplete="password"
              type="password"
              required
              onChange={e => {
                changePassword(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
