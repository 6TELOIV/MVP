import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
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

  const [quote, changeQuote] = useState(props.location.quote);
  const [quoteAuthor, changeQuoteAuthor] = useState(props.location.quoteAuthor);
  const [quoteSrc, changeQuoteSrc] = useState(props.location.quoteSrc);
  const [summary, changeSummary] = useState(props.location.summary);
  const [bestActivities, changeBestActivities] = useState(props.location.bestActivities);
  const [moonThemes, changeMoonThemes] = useState(props.location.moonThemes);
  const [signThemes, changeSignThemes] = useState(props.location.signThemes);
  const [houseThemes, changeHouseThemes] = useState(props.location.houseThemes);
  const [redirect, setRedirect] = useState(false);

  /*Handles when the save button is clicked */
  function handleSave(e) {
    e.preventDefault();
    setRedirect(true);
  }

  if (redirect) {
    return (
      <Redirect to={{ pathname: "/AdminPage"}} />
    );
  }

  return (
    <Container className={classes.container}>
      <div className={classes.paper}>
        <header>
          <h1 align="center">Admin Edit Page</h1>
        </header>
        <form onSubmit={e => handleSave(e)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
            <p>Edit Quote</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Quote"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeQuote(e.target.value);
                }}
                value={quote}
              />
            </Grid>

            <Grid item xs={12}>
              <p>Edit Quote's Author</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Quote's Author"
                multiline
                rows="1"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeQuoteAuthor(e.target.value);
                }}
                value={quoteAuthor}
              />
            </Grid>

            <Grid item xs={12}>
              <p>Edit Quote's Source </p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Quote's Source"
                multiline
                rows="1"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeQuoteSrc(e.target.value);
                }}
                value={quoteSrc}
              />
            </Grid>

            <Grid item xs={12}>
            <p>Edit Horoscope</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Horoscope"
                multiline
                rows="12"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeSummary(e.target.value);
                }}
                value={summary}
              />
            </Grid>

            <Grid item xs={12}>
            <p>Edit Best Activities</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Best Activities"
                multiline
                rows="5"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeBestActivities(e.target.value);
                }}
                value={bestActivities}
              />
            </Grid>
            
            <Grid item xs={12}>
            <p>Edit Moon Theme</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Moon Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeMoonThemes(e.target.value);
                }}
                value={moonThemes}
              />
            </Grid>
            
            <Grid item xs={12}>
            <p>Edit Sign Theme</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="Sign Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeSignThemes(e.target.value);
                }}
                
                value={signThemes}
              />
            </Grid>
            
            <Grid item xs={12}>
            <p>Edit House Theme</p>
              <TextField
                id="outlined-multiline-static"
                placeholder="House Theme"
                multiline
                rows="3"
                fullWidth
                variant="outlined"
                onChange={e => {
                  changeHouseThemes(e.target.value);
                }}
                value={houseThemes}
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