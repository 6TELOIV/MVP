import cron from 'cron';
import { addCalendarAll, sendEmailAll } from './bulkFunctions.js';
import { timestampLog } from './helpers.js';
import { getWeekMoons } from './moon.js'

const startJobs = () => {
  // Run horoscope job every Sunday at midnight
  const weeklyHoroscopeJob = new cron.CronJob("0 0 1 * * 0", () => { // change to "0 0 0 * * 0" to run every sunday at midnight
    timestampLog("Running weekly horoscope job...");

    // Get the bounds of this week
    let now = new Date();
    let nextWeek = new Date(now.getTime());
    nextWeek.setUTCDate(now.getUTCDate() + 7);

    // Get the dates and phases of moon-phase-changes
    let phaseChanges = getWeekMoons(now, nextWeek);

    // For every phase change, we need to add calendar events now, but defer the emails to the day they are happening.
    phaseChanges.forEach((phaseChange) => {
      // We want to send the emails at 8 am. Shouldn't affect the email content or the calendar entry.
      phaseChange.date.setUTCHours(8);
      phaseChange.date.setUTCMinutes(0);
      phaseChange.date.setUTCSeconds(0);
      phaseChange.date.setUTCMilliseconds(0);

      // Send all calendar entries now
      timestampLog("Running calendar horoscope job...");
      addCalendarAll(phaseChange.date, phaseChange.phase);

      // Store the phase change in a context, so that when the email job runs, it has access to it.
      timestampLog("Running email horoscope job...");
      sendEmailAll(phaseChange.date, phaseChange.phase);
    });
  });
  weeklyHoroscopeJob.start();
}

export default startJobs;