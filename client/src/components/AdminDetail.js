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
  // const sun = props.location.state.data.sun;
  // const ascendant = props.location.state.data.ascendant;
  // const horoscope = props.location.state.data.horoscope;
  const classes = useStyles();
  const sun = 4;
  const ascendant = 1;
  const moon = 3;
  const horoscope =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean. Sed cras ornare arcu dui vivamus. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Sed egestas egestas fringilla phasellus faucibus scelerisque. Velit euismod in pellentesque massa placerat. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Suscipit adipiscing bibendum est ultricies integer. Elit ut aliquam purus sit amet. Tincidunt eget nullam non nisi est sit amet facilisis magna. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Id donec ultrices tincidunt arcu non sodales. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Sit amet massa vitae tortor.";
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
