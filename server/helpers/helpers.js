//Signs

const signs = [
    {number: 1, sign: 'Aries'},
    {number: 2, sign: 'Taurus'}, 
    {number: 3, sign: 'Gemini'},
    {number: 4, sign: 'Cancer'},
    {number: 5, sign: 'Leo'},
    {number: 6, sign: 'Virgo'},
    {number: 7, sign: 'Libra'},
    {number: 8, sign: 'Scorpio'},
    {number: 9, sign: 'Sagittarius'},
    {number: 10, sign: 'Capricorn'},
    {number: 11, sign: 'Aquarius'},
    {number: 12, sign: 'Pisces'}
];

export const numberToSign = (number) => {
    return signs.find((signObj) => signObj.number == number).sign;
}
export const signToNumber = (sign) => {
    return signs.find((signObj) => signObj.sign == sign).number;
}

//Moon Phases
const phases = [
    {number: 1, phase: 'New'},
    {number: 2, phase: 'Crescent'}, 
    {number: 3, phase: 'First Quarter'},
    {number: 4, phase: 'Gibbous'},
    {number: 5, phase: 'Full'},
    {number: 6, phase: 'Disseminating'},
    {number: 7, phase: 'Last Quarter'},
    {number: 8, phase: 'Balsamic'},
];

export const numberToPhase = (number) => {
    return phases.find((phaseObj) => phaseObj.number == number).phase;
}
export const phaseToNumber = (phase) => {
    return phases.find((phaseObj) => phaseObj.phase == phase).number;
}