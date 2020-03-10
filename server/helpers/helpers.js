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