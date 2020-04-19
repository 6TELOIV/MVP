import React from "react";
import { Typography, Toolbar, AppBar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  navButton: {
    margin: "10px"
  },
  appbarTitle: {
    flexGrow: 1
  },
}));

const UserAppbar = (props) => {
  const classes = useStyles();  
  async function logout(e) {
    e.preventDefault();
    await axios.delete("/api/signout");
    props.setRedirect(true);
  }
  function returnDashboard(e) {
    e.preventDefault();
    props.setReturnDash(true);
  }
  return (
    <AppBar className="header" position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.appbarTitle}>
          Moon Flow
        </Typography>
        <Button
          className={classes.navButton}
          variant="contained"
          onClick={logout}
        >
          Logout
        </Button>
        {props.showDashboardB && (
          <Button
            className={classes.navButton}
            variant="contained"
            onClick={returnDashboard}
          >
            Dashboard
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default UserAppbar;
