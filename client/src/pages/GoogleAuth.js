import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import useStyles from "../assets/Style.js"
import axios from "axios";

export default function Landing() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5" align="center">
          Google Authentication Test Page
        </Typography>
      </Card>
    </Container>
  );
}
