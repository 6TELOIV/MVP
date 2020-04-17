import React, { useState } from "react";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { numberToPhase, numberToSign } from "../helpers/helpers.js";
import UserAppbar from "../components/UserAppbar.js";
const useStyles = makeStyles((theme) => ({
  pageMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: "10px",
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
  appbarTitle: {
    width: "100%",
  },
}));

const UserHoroscope = (props) => {
  const hs = props.location.horoscope;
  const name = props.location.name;
  const [redirect, setRedirect] = useState(false);
  const [returnDash, setReturnDash] = useState(false);
  const classes = useStyles();
  if (!hs || returnDash) {
    return <Redirect to={{ pathname: "/UserDashboard" }} />;
  }
  if (redirect) {
    return <Redirect to={{ pathname: "/Login" }} />;
  }
  return (
    <div>
      <UserAppbar
        position="sticky"
        name={name}
        showDashboardB={true}
        setReturnDash={setReturnDash}
        setRedirect={setRedirect}
      ></UserAppbar>
      <div className={classes.pageMain}>
        <Card className={classes.cardMain}>
          <div className={classes.titleFrame}>
            <Typography className={classes.title}>
              {numberToSign(hs.sign)}, House {hs.house},{" "}
              {numberToPhase(hs.moonPhase)} Moon
            </Typography>
          </div>
          <div>
            <Typography className={classes.quote}>
              {hs.quote}-{" "}
              <a className={classes.quoteSource} href={hs.quoteSrc}>
                {hs.quoteAuthor}
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
