import SunCalc from 'suncalc';

export function getPhase(date) {
  return Math.floor(SunCalc.getMoonIllumination(date).phase * 8) + 1;
}

export function getWeekMoons(start, end) { //Dates
  let changedDates = [];
  let currDate = start;
  let currPhase = getPhase(currDate);
  let prevPhase;
  for (currDate.setDate(currDate.getDate() + 1); currDate.getTime() < end.getTime(); currDate.setDate(currDate.getDate() + 1)) {
    prevPhase = currPhase;
    currPhase = getPhase(currDate);
    if ((currPhase - prevPhase) !== 0) {
      let newPhase = {
        date: new Date(currDate.getTime()),
        phase: currPhase
      }

      // We want to send the emails at 8 am. Shouldn't affect the email content or the calendar entry.
      newPhase.date.setUTCHours(8);
      newPhase.date.setUTCMinutes(0);
      newPhase.date.setUTCSeconds(0);
      newPhase.date.setUTCMilliseconds(0);

      changedDates.push(newPhase);
    }
  }
  return changedDates;
}