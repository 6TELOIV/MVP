import React from "react";
import {
  Typography,
  Toolbar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  Switch,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  main: {},
  cardHeader: {
    backgroundColor: "#CCCCCC",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  pref: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    float: "left",
    margin: theme.spacing(2),
    fontSize: 20,
  },
  unlink: {
    float: "right",
  },
  toggleName: {
    flexGrow: 1,
  },
  toggle: {},
}));

const LinkedAccount = ({
  info,
  unlinkCallback,
  disableUnlink,
  cardColorMain,
  cardColorHeader,
}) => {
  const link = info.link;
  const prefs = info.pref;
  const classes = useStyles();
  return (
    <Card className={classes.main} style={{ backgroundColor: cardColorMain }}>
      <div
        className={classes.cardHeader}
        style={{ backgroundColor: cardColorHeader }}
      >
        <Typography className={classes.title}>{link}</Typography>
        {!disableUnlink && (
          <Tooltip title="Unlink">
            <Button className={classes.unlink} onClick={unlinkCallback}>
              <Clear />
            </Button>
          </Tooltip>
        )}
      </div>
      <CardContent className={classes.cardContent}>
        {prefs.map((p) => (
          <div className={classes.pref} key={p.key}>
            <Typography className={classes.toggleName}>{p.toggle}</Typography>
            <Switch
              style={{ color: cardColorHeader }}
              color={cardColorHeader}
              className={classes.toggle}
            ></Switch>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default LinkedAccount;
