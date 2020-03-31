import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { AppBar, Typography, Toolbar } from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import "./AdminPage.css"; 
import axios from 'axios';

function AdminEdit(props) {

  /*States for the Text Fields */
  /*props.location.selHoro receives the input to be edited from the AdminPage*/

  let horoscope = props.location.selHoro;
  
  const [quote, changeQuote] = useState(horoscope.quote);
  const [quoteAuthor, changeQuoteAuthor] = useState(horoscope.quoteAuthor);
  const [quoteSrc, changeQuoteSrc] = useState(horoscope.quoteSrc);
  const [summary, changeSummary] = useState(horoscope.summary);
  const [bestActivities, changeBestActivities] = useState(horoscope.bestActivities);
  const [moonThemes, changeMoonThemes] = useState(horoscope.moonThemes);
  const [signThemes, changeSignThemes] = useState(horoscope.signThemes);
  const [houseThemes, changeHouseThemes] = useState(horoscope.houseThemes);

  const [editInfo, setEditInfo] = useState();
  const [redirect, setRedirect] = useState(false);

  /*Handles when the save button is clicked */
  async function handleSave(e) {
    e.preventDefault();
    let info = {
      sign: horoscope.sign,
      house: horoscope.house,
      moonPhase: horoscope.moonPhase,
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

    await axios.put('/api/admin', info);

    setRedirect(true);
  }

  if (redirect) {
    return (
      <Redirect to={{ pathname: "/AdminPage", state: { data: editInfo }}}/>
    );
  }

  return (
    <div className="adminRoot">
      <AppBar position="relative" className="header">
        <Toolbar>
          <div className="title">
            <Typography variant="h6" >
              Edit Horoscope
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className="edit">
        <form className="editForm"
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
                className="save"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default AdminEdit;