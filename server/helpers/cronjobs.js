import cron from 'cron';
import { addCalendarAll, sendEmailAll } from './bulkFunctions.js';
import { timestampLog } from './helpers.js';
import { getWeekMoons } from './moon.js'

export const getWeekBounds = () => {
  let now = new Date();
  now.setUTCHours(0);
  now.setUTCMinutes(0);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);
  let dayOfWeek = now.getUTCDay();

  let sunday = new Date(now.getTime());
  sunday.setUTCDate(sunday.getUTCDate() - dayOfWeek);
  
  let nextSunday = new Date(sunday.getTime());
  nextSunday.setUTCDate(sunday.getUTCDate() + 7);

  return [
    sunday,
    nextSunday
  ]
}

export const startJobs = () => {
  // Run horoscope job every Sunday at midnight
  const weeklyHoroscopeJob = new cron.CronJob("0 0 0 * * 0", () => { // change to "0 0 0 * * 0" to run every sunday at midnight
    timestampLog("Running weekly horoscope job...");

    // Get the bounds of this week
    let [sunday, nextSunday] = getWeekBounds();

    // Get the dates and phases of moon-phase-changes
    let phaseChanges = getWeekMoons(sunday, nextSunday);

    // For every phase change, we need to add calendar events now, but defer the emails to the day they are happening.
    phaseChanges.forEach((phaseChange) => {

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