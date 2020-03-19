import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "./Login.css";

//Style
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    backgroundColor: "white",
    borderRadius: "5%",
    padding: "0 50px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  save: {
    margin: theme.spacing(5, 10, 3),
    backgroundColor: "#396384"
  }
}));

function AdminEdit(props) {
  const classes = useStyles();

  const [quote, changeQuote] = useState("");
  const [horoscope, changeHoroscope] = useState("");
  const [bestActivities, changeActivity] = useState("");
  const [moon, changeMoon] = useState("");
  const [sign, changeSign] = useState("");
  const [house, changeHouse] = useState("");

  return (
    <Container className={classes.container}>
      <div className={classes.paper}>
        <header>
          <h1 align="center">Admin Edit Page</h1>
        </header>
        <form>
          <p>Edit Quote</p>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="Quote"
                multiline
                rows="4"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeQuote(e.target.value);
                }}
                autoComplete="quote"
                value={quote}
              />
            </Grid>
            <p>Edit Horoscope</p>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="Horoscope"
                multiline
                rows="15"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeHoroscope(e.target.value);
                }}
                autoComplete="horoscope"
                value={horoscope}
              />
            </Grid>
            <p>Edit Best Activities</p>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="Best Activities"
                multiline
                rows="5"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeActivity(e.target.value);
                }}
                autoComplete="bestActivities"
                value={bestActivities}
              />
            </Grid>
            <p>Edit Moon Theme</p>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="Moon Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeMoon(e.target.value);
                }}
                autoComplete="moon"
                value={moon}
              />
            </Grid>
            <p>Edit Sign Theme</p>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="Sign Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeSign(e.target.value);
                }}
                autoComplete="sign"
                value={sign}
              />
            </Grid>
            <p>Edit House Theme</p>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                placeholder="House Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeHouse(e.target.value);
                }}
                autoComplete="house"
                value={house}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                type="submit"
                className={classes.save}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default AdminEdit;