import swisseph from "swisseph";
import geoTz from "geo-tz";
import ct from "countries-and-timezones";
import isDST from "is-dst";
import passport from "passport";
import horoscopeModel from "../models/horoscopeModel.js";
import userModel from "../models/userModel.js";

/* req: {
	long,
	lat,
	name,
	email,
	birthday [UTC i.e. let date = new Date(0); date.setUTCSecconds(birthday)]
		See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime}
*/
export const signUp = async (req, res) => {
  let flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
  let date = new Date(0);
  let julday_ut, house, sunHouse;

  try {
    date.setUTCSeconds(req.body.birthday);

    //Shaun's Code for Handling Timezones and Daylight Savings
    let tz = geoTz(req.body.lat, req.body.long);
    let DST = isDST(date);
    let off;
    if (DST) {
      off = -ct.getTimezone(tz).dstOffset;
    } else {
      off = -ct.getTimezone(tz).utcOffset;
    }
    off = off / 60;

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours() + off + date.getMinutes() / 60;

    julday_ut = swisseph.swe_julday(
      year,
      month,
      day,
      hour,
      swisseph.SE_GREG_CAL
    );

    house = swisseph.swe_houses(julday_ut, req.body.lat, req.body.long, "W")
      .ascendant;
    house = Math.floor(house / 30) + 1;

    sunHouse = swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag).longitude;
    sunHouse = Math.floor(sunHouse / 30) + 1;
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          location: "swisseph",
          msg: "House/Sign Calculation Error",
        },
      ],
    });
    return;
  }

  try {
    let found = await userModel.findOne({
      username: req.body.email,
    });
    if (found) {
      res.status(400).send({
        errors: [
          {
            location: "database",
            msg: "Username taken",
          },
        ],
      });
    } else {
      await userModel.create({
        name: req.body.name,
        username: req.body.email,
        password: req.body.password,
        isAdmin: false,
        preferences: {},
        house: house,
        sign: sunHouse,
        timezoneOffset: req.body.timezoneOffset
      });
      res.send("User created").status(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          location: "database",
          msg: "Database write error",
        },
      ],
    });
    return;
  }

  res.status(200).end();
};
/**
 * req = {
 *   username,
 *   password
 * }
 */
export const signIn = async (req, res) => {
  let foundRevised = {
    name: req.user.name,
    username: req.user.username,
    isAdmin: req.user.isAdmin,
    house: req.user.house,
    sign: req.user.sign,
  };

  if (req.user.isAdmin) {
    req.session.passport.user.isAdmin = true;
  }
  res.status(200).send(foundRevised);
};

export const signOut = async (req, res) => {
  req.session.destroy();
  res.status(200).send("Successfully Logged Out");
};

export const updatePreferences = async (req, res) => {
  if (!req.session.passport.user._id) {
    res.status(401);
  }
  try {
    let user = await userModel.findOne({ _id: req.session.passport.user._id });
    let preferenceKeys = Object.keys(req.body);
    if (!user.preferences) {
      user.preferences = {};
    }
    preferenceKeys.forEach((key) => {
      user.preferences[key] = req.body[key];
    });
    user.markModified("preferences");
    await user.save();
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      errors: [
        {
          location: "database",
          msg: "Database read error",
        },
      ],
    });
  }
};

export const toggleCal = async (req, res) => {
  try {
    userModel.find({ _id: req.session.passport.user._id }).then((user) => {
      userModel
        .findOneAndUpdate(
          { _id: req.session.passport.user._id },
          { $set: { calEnabled: !user[0].calEnabled } },
          { new: true }
        )
        .then((usr) => {
          res.send(usr);
        });
    });
  } catch {
    res.status(200).send(null);
  }
};

export const toggleEmail = async (req, res) => {
  try {
    userModel.find({ _id: req.session.passport.user._id }).then((user) => {
      userModel
        .findOneAndUpdate(
          { _id: req.session.passport.user._id },
          { $set: { emailEnabled: !user[0].emailEnabled } },
          { new: true }
        )
        .then((usr) => {
          res.send(usr);
        });
    });
  } catch {
    res.status(200).send(null);
  }
};

export const getUserInfo = async (req, res) => {
  if (!req.session.passport) {
    res.status(200).send(null); //Sends null to trigger login
    return;
  }
  let found = await userModel.find({ _id: req.session.passport.user._id });

  if (!found) res.status(400).end();
  found = found[0];
  let userH = await horoscopeModel.find({
    sign: found.sign,
    house: found.house,
    moonPhase: 1,
  }); //moon phase temp will be updated later
  if (!userH) res.status(400).end();
  userH = userH[0];
  let foundRevised = {
    name: found.name,
    username: found.username,
    house: found.house,
    sign: found.sign,
    horoscope: userH,
    preferences: found.preferences,
  };
  res.status(200).send(foundRevised);
};
