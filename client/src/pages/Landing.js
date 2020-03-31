import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./Site.css";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useStyles from "../assets/Style.js"
import { Redirect }  from "react-router-dom";
import axios from "axios";

export default function Landing() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    getInfo();
  },[]);
  async function getInfo(){
      let response = await axios.get("/api/getUserInfo");
      if(response.data) setRedirect(true);
      
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
          Because you are the <br />
          skies in ecstatic motion
        </Typography>
        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              autoComplete="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
          <Link
            to={{
              pathname: "Signup",
              email: email
            }}
            style={{ textDecoration: "none" }}
          >
          
            <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth>
              Sign up
            </Button>
          </Link>
          </Grid>

          <Grid item xs={12}>
          <Typography component="h3" align="center">
            Already have an account?
          </Typography>
          </Grid>
          
          <Grid item xs={12}>
          <Link
            to={{
              pathname: "Login"
            }}
            style={{ textDecoration: "none" }}
          >
            <Button className={classes.button}
                  variant="contained"
                  color="primary"
                  fullWidth>
              Login
            </Button>
          </Link>
          </Grid>
          
          </Grid>
        </form>
      </Card>
    </Container>
  );
}
