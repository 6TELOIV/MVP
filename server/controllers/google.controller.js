import userModel from "../models/userModel.js";
import google from "googleapis";
import axios from "axios";
import { numberToSign, numberToPhase } from "../helpers/helpers.js"

let callbackURL = "/api/googleauth/callback";
let dashboardURL = "/UserDashboard";

export const calendarAdd = async (user, horoscope, date) => {
  //Pass horoscope, user, and js date
  const OAuth2 = google.google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    config.googleAuth.clientID,
    config.googleAuth.clientSecret,
    callbackURL
  );
  let tokens = user.googleTokens;

  oauth2Client.setCredentials(tokens);

  let dateString = "";
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  dateString = dateString + year + "-" + month + "-" + day;

  let html = `<div><h1>Beginning of ${numberToPhase(horoscope.moonPhase)} Moon</h1><q>${horoscope.quote}</q><p>—${horoscope.quoteAuthor}</p><h3>Your Horoscope for This Moon Phase</h3><p>${horoscope.summary}</p><h4>Best Activities</h4><p>${horoscope.bestActivities}</p><h4>${numberToPhase(horoscope.moonPhase)} Moon Themes</h4><p>${horoscope.moonThemes}</p><h4>${numberToSign(horoscope.sign)} Themes</h4><p>${horoscope.signThemes}</p><h4>House ${horoscope.house} Themes</h4><p>${horoscope.houseThemes}</p></div>`;
  var event = {
    summary: `${numberToPhase(horoscope.moonPhase)} Moon`,
    description: html,
    start: {
      date: dateString,
    },
    end: {
      date: dateString,
    },
    transparency: "transparent",
    reminders: {
      useDefault: "useDefault",
    },
  };

  const calendar = google.google.calendar({ version: "v3", oauth2Client });
  calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    },
    (err, res) => {
      if (err) return console.error("The API returned an error: " + err);
    }
  );
};

export const auth = async (req, res) => {
  if (!req.session.passport) {
    res.status(304).send(null);
    return;
  }

  userModel.findOne({ _id: req.session.passport.user._id }).then((user) => {
    if (user.googleTokens) {
      if (user.googleTokens.refresh_token) {
        res.status(304).send(null);
        return;
      }
    }

    const OAuth2 = google.google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      config.googleAuth.clientID,
      config.googleAuth.clientSecret,
      req.protocol + "://" + req.get("Host") + callbackURL
    );

    const scopes = ["https://www.googleapis.com/auth/calendar.events"];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
    });

    res.send(url);
  });
};

export const deAuth = async (req, res) => {
  if (!req.session.passport) {
    res.send(dashboardURL);
    return;
  }

  userModel.findOne({ _id: req.session.passport.user._id }).then(async (user) => {
    try {
      await axios.get(`https://accounts.google.com/o/oauth2/revoke?token=${user.googleTokens.refresh_token}`);
      try {
        user.googleTokens = undefined;
        user.isGoogleAuth = false;
        user.preferences.googleCalUpdates = undefined;
        user.markModified("preferences");
        await user.save();
        res.send(dashboardURL);
      } catch (e) {
        res.status(500).send({
          errors: [
            {
              location: "database",
              msg: "Database write error",
              err: e,
            },
          ],
        });
      }
    } catch (e) {
      res.status(500).send({
        errors: [
          {
            location: "google",
            msg: "Failed to deauthenticate",
            err: e,
          },
        ],
      });
    }
  }).catch((err) => {
      res.status(500).send({
        errors: [
          {
            location: "database",
            msg: "Database read error",
            err: err,
          },
        ],
      });
    });
};

export const callback = async (req, res) => {
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  const OAuth2 = google.google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    config.googleAuth.clientID,
    config.googleAuth.clientSecret,
    req.protocol + "://" + req.get("Host") + callbackURL
  );

  let code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);

  userModel
    .findOneAndUpdate(
      { _id: req.session.passport.user._id },
      { $set: { googleTokens: tokens, isGoogleAuth: true } },
      { new: true }
    )
    .catch((err) => {
      res.status(500).send({
        errors: [
          {
            location: "database",
            msg: "Database write error",
            err: err,
          },
        ],
      });
    });
  res.redirect(dashboardURL);
};
