import React, { useState } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Site.css";
import { Card } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "../assets/Style.js"

function Login(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [profileInfo, setProfileInfo] = useState();
  const [password, setPassword]= useState("");
  async function signIn(e) {
    e.preventDefault();
    signInRequest({username: email, password: password}, setProfileInfo.bind(this), setRedirect.bind(this));
  }
  if (redirect) {
    return (
      <Redirect to={{ pathname: "/Temp", state: { data: profileInfo } }} />
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
          validate
          onSubmit={e => signIn(e)}
        >
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              autoComplete="email"
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
