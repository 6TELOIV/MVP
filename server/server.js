import * as express from './config/express.js';

global.config = {
  db: {
  },
  openCage: {
  },
  session: {
  },
  googleAuth: {
  }
}

async function start() {
  if(process.env.NODE_ENV === 'production') {
    global.config.db.uri = process.env.DB_URI;
    global.config.openCage.key = process.env.OC_KEY;
    global.config.session.secret = process.env.SES_SEC;
    global.config.googleAuth.clientID = process.env.CLIENTID;
    global.config.googleAuth.clientSecret = process.env.CLIENTSEC;
    global.config.googleAuth.apiKey = process.env.GOOGLE_KEY;
  } else {
    global.config = (await import('./config/config.js')).default;
  }
  // Use env port or default
  const port = process.env.PORT || 5000;
  const app = express.init();
  app.listen(port, () => console.log(`Server now running on port ${port}!`));
}

start();