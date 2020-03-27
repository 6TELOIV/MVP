import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom"; //Shaun added
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10%"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  ok: {
    backgroundColor: "white",
    borderRadius: "5%"
  },
  variable: {
    textAlign: "center",
    lineHeight: "30px"
  }
}));
const AdminDetail = props => {
  const hs = props.horoscopeView; //Changed some stuff here to better adapt to the current horoscope model - Shaun
  const sign = hs.sign;
  const moon = hs.moonPhase;
  const house = hs.house;
  const text = hs.summary;
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.ok}>
      <div className={classes.paper}>
        <div className={classes.header}>
          <h5 className={classes.variable}>Sign<br></br>{sign}</h5>
          <h5 className={classes.variable}>House<br></br>{house}</h5>
          <h5 className={classes.variable}>Moon<br></br>{moon}</h5>
        </div>
        <h5>Text</h5>
        <p>{text}</p>

        <Link
            to={{
              pathname: "AdminEdit",
              selHoro: hs
            }}
            style={{ textDecoration: "none" }}
        >
            <Button className={classes.button} variant="outlined" size="small">
              Edit
            </Button>
        </Link>
      </div>
    </Container>
  );
};

export default AdminDetail;
