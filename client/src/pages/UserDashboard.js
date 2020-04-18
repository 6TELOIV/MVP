import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  CssBaseline,
  Container,
  Card,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";
import { numberToSign } from "../helpers/helpers.js";
import UserAppbar from "../components/UserAppbar.js";
import googleIcon from "../assets/googleIcon.png";
import LinkedAccount from "../components/LinkedAccount.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  preferencePaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  createAccountPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  preferenceIcon: {
    height: "25px",
  },
  userDashboardGrid: {},
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
  });
  const [redirect, setRedirect] = useState(false);
  const [googleCalendar, setGoogleCalendar] = useState(false);
  const [linkedAccountInfo, setLinkedAccountInfo] = useState({
    linkedAccount: [
      {
        link: "Google Calendar",
        pref: [
          { key: "1", toggle: "Enable Calendar" },
          { key: "2", toggle: "Enable Detailed View" },
        ],
      },
      {
        link: "Email",
        pref: [{ key: "1", toggle: "Every moon phase" }],
      },
    ],
  });
  /*Preferences link an account*/
  const [account, setAccount] = useState({
    checkedA: false,
    checkedB: true,
  });

  //Async Functions--------------------------------------------------------------------
  async function getInfo() {
    let response = await axios.get("/api/getUserInfo");
    if (!response.data) setRedirect(true);
    if (response.status === 200) {
      setUserInfo(response.data);
    }
  }
  async function logout(e) {
    e.preventDefault();
    await axios.delete("/api/signout");
    setRedirect(true);
  }
  async function callGoogleAuth(e) {
    e.preventDefault();
    await axios
      .put("api/googleauth")
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("google already authenticated!");
      });
    setGoogleCalendar(true);
  }
  async function callGoogleDeAuth(e) {
    // let res = await axios.put("api/googledeauth");
    // if (res.data) {
    //   window.location.href = res.data;
    // }
    console.log("unlinked!");
  }
  async function updateCalendarToggle() {
    await axios.post("/api/toggleCal", {});
  }

  //Handlers--------------------------------------------------------------------
  const handleAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.checked });
    updateCalendarToggle();
  };
  if (redirect) {
    return <Redirect to={{ pathname: "/Login" }} />;
  }

  //HTML
  return (
    <div style={{ height: "100%" }}>
      <UserAppbar
        position="static"
        name={userInfo.name}
        showDashboardB={false}
        setRedirect={setRedirect}
      />
      <Container>
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
              <Avatar className={classes.avatar} />
              <Typography component="h1" variant="h5" align="center">
                Profile Information
              </Typography>
              <br></br>
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
                    House: {numberToSign(userInfo.house)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/*Preferences*/}

          <Grid item xs={12} md={6} spacing>
            <div className={classes.lowerMargin}>
              <Card className={classes.createAccountPaper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="left">
                      Account Management
                    </Typography>
                    <Typography variant="body2" align="left">
                      Link an account
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={(e) => callGoogleAuth(e)}>
                      <img
                        className={classes.preferenceIcon}
                        src={googleIcon}
                      ></img>
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </div>
            <div className={classes.lowerMargin}>
              <LinkedAccount
                color="#0779e4"
                info={linkedAccountInfo.linkedAccount[1]}
                disableUnlink
                unlinkCallback={callGoogleDeAuth}
                cardColorHeader={"#21bf73"}
                cardColorMain={"#b0eacd"}
              />
            </div>
            {googleCalendar && (
              <div className={classes.lowerMargin}>
                <LinkedAccount
                  info={linkedAccountInfo.linkedAccount[0]}
                  unlinkCallback={callGoogleDeAuth}
                  cardColorHeader={"#1a73e8"}
                  cardColorMain={"#69a1ff"}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default UserDashboard;
