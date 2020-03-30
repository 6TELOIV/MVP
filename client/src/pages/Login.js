import React, { useState } from "react";
import {signInRequest} from "../helpers/loginFunction.js"
import "./Login.css";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(5, 10, 3),
    backgroundColor: "#396384"
  },
  ok: {
    backgroundColor: "white",
    borderRadius: "5%"
  }
}));

function Login(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  //const [profileInfo, setProfileInfo] = useState();
  const [password, setPassword]= useState("");
  async function signIn(e) {
    e.preventDefault();
    signInRequest({username: email, password: password}, setRedirect.bind(this));
  }
  if (redirect) {
    return (
      <Redirect to={{ pathname: "/Temp"}} />
    );
  }
  return (
    <Container component="main" maxWidth="xs" className={classes.ok}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Login</Typography>

        <form
          className={classes.form}
          validate
          onSubmit={e => signIn(e)}
        >
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              autoComplete="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Button
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
