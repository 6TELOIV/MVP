import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  const hs = props.horoscopeView;
  const sun = hs.sun;
  const moon = hs.moon;
  const ascendant = hs.ascendant;
  const horoscope = hs.horoscope;
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.ok}>
      <div className={classes.paper}>
        <div className={classes.header}>
          <h5 className={classes.variable}>Sun<br></br>{sun}</h5>
          <h5 className={classes.variable}>Ascendant<br></br>{ascendant}</h5>
          <h5 className={classes.variable}>Moon<br></br>{moon}</h5>
        </div>
        <h5>Horoscope</h5>
        <p>{horoscope}</p>
      </div>
    </Container>
  );
};

export default AdminDetail;
