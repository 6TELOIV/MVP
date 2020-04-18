import SunCalc from 'suncalc';

function getPhase(date) {
  return Math.floor(SunCalc.getMoonIllumination(date).phase * 8)
}

export default async function getWeekMoon(start, end) { //Dates
    let changedDates = [];
    let currDate = start;
    let currPhase = getPhase(currDate);
    let prevPhase;
    for (currDate.setDate(currDate.getDate() + 1); currDate.getTime() < end.getTime(); currDate.setDate(currDate.getDate() + 1)) {
      prevPhase = currPhase;
      currPhase = getPhase(currDate);
      if((currPhase - prevPhase) !== 0) {
        changedDates.push({
          date: new Date(currDate.getTime()),
          phase: currPhase
        });
      }
    }
    return changedDates;
}