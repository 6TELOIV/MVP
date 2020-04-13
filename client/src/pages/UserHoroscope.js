import React, { useEffect, useState } from "react";
import { Typography, Toolbar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { numberToPhase, numberToSign } from "../helpers/helpers.js";
import Button from "@material-ui/core/Button";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  pageMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: "1",
  },
  cardMain: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "50px",
    width: "800px",
  },
  title: {
    textDecoration: "none",
    fontSize: "30px",
    margin: "30px",
  },
  titleFrame: {
    textAlign: "center",
  },
  paragraph: {
    variant: "body2",
    component: "p",
  },
  quote: {
    fontSize: "20px",
  },
  quoteSource: {
    textDecoration: "none",
    color: "#CD5C5C",
  },
  navButton: {
    margin: "10px",
    float: "right",
  },
  navigation: {
    width: "100%",
    zIndex: "2",
    position: "absolute",
  },
}));

const UserHoroscope = (props) => {
  const hs = props.location.horoscope;
  const [redirect, setRedirect] = useState(false);
  const [returnDash, setReturnDash] = useState(false);
  const classes = useStyles();
  async function logout(e) {
    e.preventDefault();
    await axios.delete("/api/signout");
    setRedirect(true);
  }
  function returnDashboard(e) {
    e.preventDefault();
    setReturnDash(true);
  }
  if (!hs || returnDash) {
    return <Redirect to={{ pathname: "/UserDashboard" }} />;
  }
  if (redirect) {
    return <Redirect to={{ pathname: "/Login" }} />;
  }
  return (
    <div>
      <div className={classes.navigation}>
        <Button
          className={classes.navButton}
          variant="contained"
          onClick={logout}
        >
          Logout
        </Button>
        <Button
          className={classes.navButton}
          variant="contained"
          onClick={returnDashboard}
        >
          Dashboard
        </Button>
      </div>
      <div className={classes.pageMain}>
        <Card className={classes.cardMain}>
          <div className={classes.titleFrame}>
            <Typography className={classes.title}>
              {numberToSign(hs.sign)}, House {hs.house},{" "}
              {numberToPhase(hs.moonPhase)} moon
            </Typography>
          </div>
          <div>
            <Typography className={classes.quote}>
              {hs.quote}- {hs.quoteAuthor},{" "}
              <a className={classes.quoteSource} href={hs.quoteSrc}>
                Source
              </a>
            </Typography>
            <br />
            <Typography classname={classes.paragraph}>{hs.summary}</Typography>
            <br />
            <div className={classes.titleFrame}>
              <Typography className={classes.title}>Best Activities</Typography>
            </div>
            <Typography classname={classes.paragraph}>
              {hs.bestActivities}
            </Typography>
            <div className={classes.titleFrame}>
              <Typography className={classes.title}>Themes</Typography>
            </div>
            <Typography variant="subtitle1" component="span">
              {numberToPhase(hs.moonPhase)} Moon themes:{" "}
            </Typography>
            <Typography variant="body2" component="span">
              {hs.moonThemes}
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              Sign themes:{" "}
            </Typography>
            <Typography variant="body2" component="span">
              {hs.signThemes}
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              House themes:{" "}
            </Typography>
            <Typography variant="body2" component="span">
              {hs.houseThemes}
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserHoroscope;
