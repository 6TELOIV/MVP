import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Switch,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons"


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
  title,
  prefs,
  prefsDisabled,
  unlinkCallback,
  prefCallback,
  disableUnlink,
  cardColorMain,
  cardColorHeader,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.main} style={{ backgroundColor: cardColorMain }} variant="outlined">
      <div
        className={classes.cardHeader}
        style={{ backgroundColor: cardColorHeader }}
      >
        <Typography className={classes.title}>{title}</Typography>
        {!disableUnlink && (
          <Tooltip title="Unlink Account">
            <Button className={classes.unlink} onClick={unlinkCallback}>
              <Clear />
            </Button>
          </Tooltip>
        )}
      </div>
      <CardContent className={classes.cardContent}>
        {prefs.map((pref) => (
          <div className={classes.pref} key={pref.name}>
            <Typography className={classes.toggleName}>{pref.title}</Typography>
            <Switch
              disabled={prefsDisabled}
              name={pref.name}
              checked={pref.value}
              color="primary"
              className={classes.toggle}
              onChange={prefCallback}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default LinkedAccount;
