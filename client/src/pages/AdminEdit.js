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

  /*States for the Text Fields */
  /*props.location.data receives the input to be edited from the AdminPage*/

  const [quote, changeQuote] = useState(props.location.quote);
  const [quoteAuthor, changeQuoteAuthor] = useState(props.location.quoteAuthor);
  const [quoteSrc, changeQuoteSrc] = useState(props.location.quoteSrc);
  const [summary, changeSummary] = useState(props.location.summary);
  const [bestActivities, changeBestActivities] = useState(props.location.bestActivities);
  const [moonThemes, changeMoonThemes] = useState(props.location.moonThemes);
  const [signThemes, changeSignThemes] = useState(props.location.signThemes);
  const [houseThemes, changeHouseThemes] = useState(props.location.houseThemes);

  const [editInfo, setEditInfo] = useState();
  const [redirect, setRedirect] = useState(false);

  /*Handles when the save button is clicked */
  async function handleSave(e) {
    e.preventDefault();
    let info = {
      quote:quote,
      quoteAuthor:quoteAuthor,
      quoteSrc:quoteSrc,
      summary:summary,
      bestActivities:bestActivities,
      moonThemes:moonThemes,
      signThemes:signThemes,
      houseThemes:houseThemes
    };
    setEditInfo(info);
    setRedirect(true);
  }

  if (redirect) {
    return (
      <Redirect to={{ pathname: "/AdminPage", state: { data: editInfo }}}/>
    );
  }

  return (
    <Container className={classes.container}>
      <div className={classes.paper}>
        <header>
          <h1 align="center">Admin Edit Page</h1>
        </header>
        <form 
          onSubmit={e => handleSave(e)}>

          {/*Quote Edit Text Field*/}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="quote-edit"
                label="Quote"
                value={quote}
                multiline
                fullWidth
                margin = "normal"
                rows="3"
                variant="outlined"
                onChange={e => {
                  changeQuote(e.target.value);
                }}
              />
            </Grid>

            {/*Quote Author Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="quote-author-edit"
                label="Quote's Author"
                value={quoteAuthor}
                multiline
                fullWidth
                margin = "normal"
                rows="1"
                variant="outlined"
                onChange={e => {
                  changeQuoteAuthor(e.target.value);
                }}
              />
            </Grid>

            {/*Quote Source Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="quote-source-edit"
                label="Quote's Source"
                value={quoteSrc}
                multiline
                fullWidth
                margin = "normal"
                rows="1"
                variant="outlined"
                onChange={e => {
                  changeQuoteSrc(e.target.value);
                }}
              />
            </Grid>

            {/*Horoscope Summary Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="horoscope-edit"
                label="Horoscope"
                value={summary}
                multiline
                fullWidth
                margin = "normal"
                rows="12"
                variant="outlined"
                onChange={e => {
                  changeSummary(e.target.value);
                }}
              />
            </Grid>

            {/*Best Activities Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="best-activities-edit"
                label="Best Activities"
                value={bestActivities}
                multiline
                fullWidth
                margin = "normal"
                rows="5"
                variant="outlined"
                onChange={e => {
                  changeBestActivities(e.target.value);
                }}
              />
            </Grid>

            {/*Moon Theme Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="moon-theme-edit"
                label="Moon Theme"
                value={moonThemes}
                multiline
                fullWidth
                margin = "normal"
                rows="3"
                variant="outlined"
                onChange={e => {
                  changeMoonThemes(e.target.value);
                }}
              />
            </Grid>

            {/*Sign Theme Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="sign-theme-edit"
                label="Sign Theme"
                value={signThemes}
                multiline
                fullWidth
                margin = "normal"
                rows="3"
                variant="outlined"
                onChange={e => {
                  changeSignThemes(e.target.value);
                }}
              />
            </Grid>

            {/*House Theme Edit Text Field*/}
            <Grid item xs={12}>
              <TextField
                id="house-theme-edit"
                label="House Theme"
                value={houseThemes}
                multiline
                fullWidth
                margin = "normal"
                rows="3"
                variant="outlined"
                onChange={e => {
                  changeHouseThemes(e.target.value);
                }}
              />
            </Grid>
            
            {/*Save Button*/}
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