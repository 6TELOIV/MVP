import passport from 'passport'
import userModel from '../models/userModel.js';
import google from 'googleapis';

let callbackURL = 'http://localhost:5000/api/googleauth/callback';
let dashboardURL = 'http://localhost:3000/UserDashboard';
let authURL = 'http://localhost:5000/api/googleauth';

function listEvents(oauth2Client) {
    const calendar = google.google.calendar({version: 'v3', oauth2Client});
    calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
  }

  function createEvent(oauth2Client) {
    let user = {
        username: "Shaun"
    }
    let horoscope = {
        quote: "Hey its a quote",
        summary: "This is the summary"
    }

    let html = 
        `
        <div>
          <h1>Welcome ${user.username}</h1>
          <q>${horoscope.quote}</q>
          <p>"Your Weekly Summary of the Stars: "${horoscope.summary}</p>
        </div>
        `;

    var event = {
        'summary': 'Horoscope Test',
        // 'location': '800 Howard St., San Francisco, CA 94103',
        'description': html,//'Horoscopes are wild',
        'start': {
          'date': '2020-04-14',
          //'dateTime': '2020-04-14T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        'end': {
          'date': '2020-04-14',
          //'dateTime': '2020-04-14T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        }
        // 'recurrence': [
        //   'RRULE:FREQ=DAILY;COUNT=2'
        // ],
        // 'attendees': [
        //   {'email': 'lpage@example.com'},
        //   {'email': 'sbrin@example.com'},
        // ],
        // 'reminders': {
        //   'useDefault': true,
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10},
        //   ],
        //}
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

export const calendarList = async(req, res) => {
    const OAuth2 = google.google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.googleAuth.clientID,
        config.googleAuth.clientSecret,
        callbackURL
    );

    userModel.find({_id: req.session.passport.user._id})
    .then((user)=>{
        let tokens = user[0].googleTokens;

        if(!tokens || !tokens.refresh_token){
            res.redirect(authURL);
            return;
        }

        oauth2Client.setCredentials(tokens);

        listEvents(oauth2Client);
        res.send("Calendar entries listed");
    })
    .catch((err) => {
        res.status(500).send({
			errors: [
				{
					location: 'database',
                    msg: 'User not found',
                    err: err
				}
			]
        })
    });
    
}

export const calendarAdd = async(req, res) => {
    const OAuth2 = google.google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.googleAuth.clientID,
        config.googleAuth.clientSecret,
        callbackURL
    );

    userModel.find({_id: req.session.passport.user._id})
    .then((user)=>{
        let tokens = user[0].googleTokens;

        if(!tokens || !tokens.refresh_token){
            res.redirect(authURL);
            return;
        }

        oauth2Client.setCredentials(tokens);

        createEvent(oauth2Client);
        res.send("Calendar entry added");
    })
    .catch((err) => {
        res.status(500).send({
			errors: [
				{
					location: 'database',
                    msg: 'User not found',
                    err: err
				}
			]
        })
    });
    
}