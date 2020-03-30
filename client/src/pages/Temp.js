import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./Site.css";
import {getUserInfo} from "../helpers/loginFunction.js"


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



const Temp = (props) => {
  const classes = useStyles();
  const [data, setData] = useState("Loading");

  async function getData(){
    getUserInfo(setData.bind(this));
  }
  useEffect(() => {
    getData()
  }, [])

  //console.log("Data in Getinfo: " + JSON.stringify(data));
  if(!data){
    return (
      <Redirect to={{ pathname: "/login"}} />
    )
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.ok}>
      <CssBaseline />
      <div style={{ backgroundColor: "white" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Container>
  );
};

export default Temp;
