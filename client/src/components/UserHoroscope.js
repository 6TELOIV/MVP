import React from "react";
import { Typography, Toolbar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import "./AdminDetail.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "15px",
    width: "400px",
  },
  title: {
    textDecoration: "underline",
    fontSize: "30px",
  },
  titleFrame: {
    textAlign: "center",
  },
}));

const UserHoroscope = (props) => {
  const hs = props.hs;
  const classes = useStyles();
  return (
    <Card className={classes.cardMain}>
      <div className={classes.titleFrame}>
        <Typography className={classes.title}>Horoscope</Typography>
      </div>
      <div>
        <Typography variant="body2" component="p">
          {hs.summary}
        </Typography>
        <br />
        <br />
        <div className={classes.titleFrame}>
          <Typography className={classes.title}>Quote</Typography>
        </div>
        <Typography variant="body2" component="p">
          {hs.quote}
        </Typography>
        <br />
        <Typography variant="body2">-{hs.quoteAuthor}</Typography>
        <Typography variant="body2">source: {hs.quoteSrc}</Typography>
        <br />
        <br />
        <div className={classes.titleFrame}>
          <Typography className={classes.title}>Best Activities</Typography>
        </div>
        <Typography variant="body2" component="p">
          {hs.bestActivities}
        </Typography>
        <br />
        <br />
        <Typography variant="subtitle1" component="span">
          Moon themes:{" "}
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
  );
};

export default UserHoroscope;
