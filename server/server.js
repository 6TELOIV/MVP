import * as express from './config/express.js';
import cron from 'cron';
import lune from 'lune';

global.config = {
  db: {
  },
  openCage: {
  },
  session: {
  }
}


async function start() {
  if(process.env.NODE_ENV === 'production') {
    global.config.db.uri = process.env.DB_URI;
    global.config.openCage.key = process.env.OC_KEY;
    global.config.session.secret = process.env.SES_SEC;
  } else {
    global.config = (await import('./config/config.js')).default;
  }

  // Use env port or default
  const port = process.env.PORT || 5000;
  
  const app = express.init();
  app.listen(port, () => console.log(`Server now running on port ${port}!`));
  
  const weeklyHoroscopeJob = new cron.CronJob("*/10 * * * * *", () => {
    let now = new Date();
    let nextWeek = new Date(now.getTime());
    nextWeek.setDate(now.getDate() + 7);
    let upcomingPhases = lune.phase_range(now, nextWeek);
    console.log(now, nextWeek, upcomingPhases);

    now.setSeconds(now.getSeconds() + 5);
    let newJob = new cron.CronJob(now, () => {
      let now = new Date();
      console.log(now.toLocaleTimeString());
    });
    newJob.start();
  });
  weeklyHoroscopeJob.start();
}

start();