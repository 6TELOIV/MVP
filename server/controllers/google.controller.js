import passport from 'passport'
import userModel from '../models/userModel.js';
import google from 'googleapis';

let callbackURL = 'http://localhost:5000/api/googleauth/callback';
let dashboardURL = 'http://localhost:3000/UserDashboard';
let authURL = 'http://localhost:5000/api/googleauth';

export const calendarAddFromServer = async(user, horoscope, date) => { //Pass horoscope, user, and js date
    const OAuth2 = google.google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.googleAuth.clientID,
        config.googleAuth.clientSecret,
        callbackURL
    );
    let tokens = user.googleTokens;

    oauth2Client.setCredentials(tokens);

    let dateString = '';
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    if(day < 10){
        day = '0' + day;
    }

    if(month < 10){
        month = '0' + month;
    }

    dateString = dateString + year + '-' + month + '-' + day;

    let html = 
        `
        <div>
          <h1>Welcome ${user.name}</h1>
          <q>${horoscope.quote}</q>
          <p>"Your Weekly Summary of the Stars: "${horoscope.summary}</p>
        </div>
        `;

    var event = {
        'summary': 'Daily Horoscope',
        'description': html,
        'start': {
          'date': dateString,
        },
        'end': {
          'date': dateString,
        },
        'transparency': 'transparent',
        'reminders': {
          'useDefault': 'useDeault',
        }
      };

    const calendar = google.google.calendar({version: 'v3', oauth2Client});
    calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: event
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log("Event created successfully")
    });
    
}

export const auth = async(req, res) => {
    if(!req.session.passport){
        res.redirect(dashboardURL);
        return;
    }

    userModel.findOne({_id: req.session.passport.user._id})
    .then((user)=>{
        if(user.googleTokens){
            if(user.googleTokens.refresh_token){
                res.redirect(dashboardURL);
                return;
            }
        }

        const OAuth2 = google.google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            config.googleAuth.clientID,
            config.googleAuth.clientSecret,
            callbackURL
        );


        const scopes = ['https://www.googleapis.com/auth/calendar.events'];
        
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: scopes
        })

        res.redirect(url);
    });
}

export const deAuth = async(req, res) => {

    if(!req.session.passport){
        res.redirect(dashboardURL);
        return;
    }

    userModel.findOneAndUpdate({_id: req.session.passport.user._id}, {'$unset': {"googleTokens": ""}}, {new: true})
    .catch((err)=>{
        res.status(500).send({
			errors: [
				{
					location: 'database',
                    msg: 'Database write error',
                    err: err  
				}
			]
        })
    })

    res.send("Google DeAuthorized");
}

export const callback = async(req, res) => {
    // This will provide an object with the access_token and refresh_token.
    // Save these somewhere safe so they can be used at a later time.
    const OAuth2 = google.google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.googleAuth.clientID,
        config.googleAuth.clientSecret,
        callbackURL
    );

    let code = req.query.code;

    const {tokens} = await oauth2Client.getToken(code);

    userModel.findOneAndUpdate({_id: req.session.passport.user._id}, {'$set': {"googleTokens": tokens}}, {new: true})
    .catch((err)=>{
        res.status(500).send({
			errors: [
				{
					location: 'database',
                    msg: 'Database write error',
                    err: err  
				}
			]
        })
    })

    res.redirect(dashboardURL);
}

export const calendarAdd = async(req, res) => { //Temp endpoint for testing
    let user = await userModel.findOne({_id: req.session.passport.user._id});
    let horoscope = {
        quote: "Hey its a quote",
        summary: "This is the summary"
    }

    let date = new Date();

    calendarAddFromServer(user, horoscope, date);
    res.send("Entry added")
    
}