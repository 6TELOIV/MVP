import * as express from './config/express.js';
import startJobs from './helpers/cronjobs.js';
import message from './helpers/emailer.js';
import { calendarAdd } from './controllers/google.controller.js';

global.config = {
  db: {
  },
  openCage: {
  },
  session: {
  },
  googleAuth: {
  },
}

async function start() {
  if(process.env.NODE_ENV === 'production') {
    global.config.db.uri = process.env.DB_URI;
    global.config.openCage.key = process.env.OC_KEY;
    global.config.session.secret = process.env.SES_SEC;
    global.config.googleAuth.clientID = process.env.CLIENTID;
    global.config.googleAuth.clientSecret = process.env.CLIENTSEC;
    global.config.googleAuth.apiKey = process.env.GOOGLE_KEY;
    global.config.emailPass = process.env.EMAIL_PASS;
  } else {
    global.config = (await import('./config/config.js')).default;
  }
  // Use env port or default
  const port = process.env.PORT || 5000;
  const app = express.init();
  app.listen(port, () => console.log(`Server now running on port ${port}!`));
  let user = {
    name: 'Max',
    username: 'rosenzweig.max@gmail.com',
    password: '$2a$10$hizwPSXMXM95hbKYmjzUG.FxABEVY2uCfACq1HpXs2bJkf5DdQtB6',
    isAdmin: true,
    isGoogleAuth: true,
    house: 12,
    sign: 9,
    timezoneOffset: 240,
    passwordHashed: true,
    __v: 0,
    preferences: { emailUpdates: false, googleCalUpdates: null },
    googleTokens: {
      access_token: 'ya29.a0Ae4lvC2Xs0g3uaK5BZlH_7v-AU1N1Ti9RItI3VXYYQIs-d_oTj9LfhkJBYvD8TxDr_PwEhunBfgpF2pkGO9hXK4Pwk-zs4i-a4cf3HQt2WCNCbNSu0jOdRe-Nia42xa_j87fzujgiidtBjSqGN0NhMZQVocx2bAownM',     
      refresh_token: '1//0fy-_ffEfBb3BCgYIARAAGA8SNwF-L9IrSzQEqexquUGtQyT29tPFXNpr-Y0fpHom7XLUrjZHv0wwX15jXGpVam4TyaMgpufiPtA',
      scope: 'https://www.googleapis.com/auth/calendar.events',
      token_type: 'Bearer',
      expiry_date: 1587246732324
    }
  }
  let horoscope = {"sign":9,"house":12,"moonPhase":1,"quote":"Too often we mistakenly believe that doing less makes us lazy and results in a lack of productivity. Instead, doing less helps us savor what we do accomplish. ","quoteAuthor":"Marc Lesser","quoteSrc":"https://tricycle.us8.list-manage.com/track/click?u=7914aa1664771ddd4c8fa8040&id=f8ba8865ad&e=f2d97e7692","summary":"Sometimes you must bring things to a close before moving forward. The next few days will be one of those times. If you’ve been procrastinating, use this time to finish up whatever you want to put behind you. In particular, tackle those things that require a bit of courage, self-advocacy, or spunky independence. Here’s the thing: overall your mood may be quieter and more contemplative, so you’ll want to focus your energies to avoid running out of steam. To get the most of the day, balance your activity with time away from the hustle of the world.\n\nIf you find yourself feeling blocked or stymied—or caught up in old, self-defeating patterns—muster the courage to face your ghosts. Rather than beating yourself up for the junk food you just ate or the deadline you missed (again), try honestly assessing what lies behind the missteps and then commit to a more realistic path forward. (Doesn’t this sound more constructive than beating yourself up or wallowing in guilt?) For the more spiritually minded, the next few days are fruitful ones for retreat, yoga, prayer— anything that directs your focus inward.\n\nIn general, you’ll find it easier to do your own thing right now, and you’re more likely to succeed when you put your passions and enthusiasms front and center. Choosing one thing that needs handling—something you care about—and giving it a final push will be easier than casting the net wide. If it happens to be a tedious task, try tackling it in short bursts and keeping your eye on the prize. Working somewhere free of distraction will also help. ","bestActivities":"Solo workouts and physical activities. Chill time: taking a pause before a new cycle starts. Tying up loose ends; clearing the slate. Self-reflection on habits or behaviors that get in your way. Initiatives that let you work alone or in the background. (Avoid the masses.) Using your strength to advocate or help those who don’t have a voice or are disempowered. It’s your monthly “New Year’s Eve”: what do you want to leave in the old month and not carry forward? Contemplative activities: retreat/meditation/yoga/ solitude.","moonThemes":"Completing, releasing, preparing for the next cycle of growth, letting go of the past, endings/closures, contemplation, tying up loose ends.","signThemes":"Self-definition, confidence, independence, passion, drive, healthy selfassertion, courage, putting oneself first, intuition, initiating, impulsivity, fighting for what’s important to you or the underdog, leading rather than following","houseThemes":" Self-sabotage, unconscious patterns, solitude, contemplation, alone time, withdraw, supporting those in need, charitable acts, spirituality. "}
  message(user, horoscope, new Date());
  //calendarAdd(user, horoscope, new Date());
  startJobs();
}

start();