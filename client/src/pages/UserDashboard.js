import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  CssBaseline,
  Container,
  Card,
  Paper
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";
import { numberToSign } from "../helpers/helpers.js";
import UserAppbar from "../components/UserAppbar.js";
import googleIcon from "../assets/googleIcon.png";
import LinkedAccount from "../components/LinkedAccount.js";
import { withStyles } from "@material-ui/styles";

const AccountButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#CCC",
    '&:hover': {
      backgroundColor: "#AAA",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: "#D74C3D",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 3),
    backgroundColor: "#396384",
  },
  navButton: {
    margin: "10px",
    float: "right",
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  lowerMargin: {
    marginBottom: theme.spacing(2),
  },
  createAccountPaper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  preferenceIcon: {
    height: "25px",
  },
  linkAccountsPaper: {
    padding: theme.spacing(2),
    backgroundColor: "#EEE"
  },
}));

function UserDashboard(props) {
  const classes = useStyles();
  useEffect(() => {
    getInfo();
  }, []);

  //States--------------------------------------------------------------------
  const [userInfo, setUserInfo] = useState({
    name: "",
    sign: 1,
    house: 1,
    username: "",
    horoscope: {},
    isGoogleAuth: false
  });
  const [redirect, setRedirect] = useState(false);
  const [googlePrefs, setGooglePrefs] = useState([]);
  const [emailPrefs, setEmailPrefs] = useState([]);
  const [prefsDisabled, setPrefsDisabled] = useState(true);

  //Async Functions--------------------------------------------------------------------
  async function getInfo() {
    try {
      let response = await axios.get("/api/getUserInfo");
      setUserInfo(response.data);
      if (!response.data.preferences)
        response.data.preferences = {};
      setGooglePrefs([
        {
          title: "Add Horoscopes to Google Calendar",
          name: "googleCalUpdates",
          value: response.data.preferences.googleCalUpdates
        }
      ])
      setEmailPrefs([
        {
          title: "Receive Horoscope Emails",
          name: "emailUpdates",
          value: response.data.preferences.emailUpdates
        }
      ]);

    } catch (e) {
      setRedirect(true);
    }
    setPrefsDisabled(false);
  }
  async function callGoogleAuth(e) {
    e.preventDefault();
    await axios
      .put("api/googleauth")
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function updatePreferences(e) {
    setPrefsDisabled(true);
    await axios
      .put("api/updatePreferences",
        {
          [e.target.name]: e.target.checked
        })
      .then(() => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function callGoogleDeAuth(e) {
    let res = await axios.put("api/googledeauth");
    if (res.data) {
      window.location.href = res.data;
    }
    console.log("unlinked!");
  }

  if (redirect) {
    return <Redirect to={{ pathname: "/Login" }} />;
  }

  //HTML
  return (
    <div>
      <UserAppbar
        position="static"
        showDashboardB={false}
        setRedirect={setRedirect}
      />
      <Container maxWidth="lg">
        <Grid
          style={{
            padding: "10px",
          }}
          spacing={2}
          container
          className={classes.userDashboardGrid}
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={6}>
            <CssBaseline />
            <Card className={classes.paper}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar className={classes.avatar} />
                <Typography component="h1" variant="h5" align="center">
                  Profile Information
                </Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography component="h3" align="center">
                    Name: {userInfo.name}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="h3" align="center">
                    Username: {userInfo.username}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="h3" align="center">
                    Sign: {numberToSign(userInfo.sign)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="h3" align="center">
                    House {userInfo.house} - {numberToSign(userInfo.house)}
                  </Typography>
                </Grid>
              </Grid>
              <div>
                <Link
                  to={{
                    pathname: "UserHoroscope",
                    name: userInfo.name,
                    horoscope: userInfo.horoscope,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Horoscope
                    </Button>
                </Link>
              </div>
            </Card>
          </Grid>

          {/*Preferences*/}

          <Grid item xs={12} md={6}>
            <Card className={classes.createAccountPaper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="left">
                    Account Management
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Paper variant="outlined" className={classes.linkAccountsPaper}>
                    <Typography variant="body2" align="left">
                      Link an account
                    </Typography>
                    {
                      userInfo.isGoogleAuth ?
                        <p>
                          Accounts that you have not yet linked will appear here.
                        </p> :
                        <AccountButton onClick={(e) => callGoogleAuth(e)}>
                          <img
                            alt="Google"
                            className={classes.preferenceIcon}
                            src={googleIcon}
                          />
                        </AccountButton>
                    }
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.lowerMargin}>
                    <LinkedAccount
                      title="Email"
                      prefs={emailPrefs}
                      disableUnlink
                      unlinkCallback={callGoogleDeAuth}
                      prefCallback={updatePreferences}
                      cardColorHeader={"#21bf73"}
                      cardColorMain={"#b0eacd"}
                      prefsDisabled={prefsDisabled}
                    />
                  </div>
                  {userInfo.isGoogleAuth && (
                    <div className={classes.lowerMargin}>
                      <LinkedAccount
                        title="Google Calendar"
                        prefs={googlePrefs}
                        unlinkCallback={callGoogleDeAuth}
                        prefCallback={updatePreferences}
                        cardColorHeader={"#1a73e8"}
                        cardColorMain={"#69a1ff"}
                        prefsDisabled={prefsDisabled}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default UserDashboard;
