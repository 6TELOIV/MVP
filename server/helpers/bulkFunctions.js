import userModel from '../models/userModel.js';
import horoscopeModel from '../models/horoscopeModel.js';
import { calendarAdd } from '../controllers/google.controller.js';
import  message from './emailer.js';
import cron from 'cron';

export function UTCDateToTimezone(date, timezoneOffset) {
    let localDate = new Date(date.getTime());
    localDate.setUTCMinutes(localDate.getUTCMinutes() + timezoneOffset);
    return localDate;
}

export function timezoneDateToUTC(date, timezoneOffset) {
    let localDate = new Date(date.getTime());
    localDate.setUTCMinutes(localDate.getUTCMinutes() - timezoneOffset);
    return localDate;
}

export async function addCalendarAll(date, phase) { // date and number
    //add calendar event to all users with google setup for that date and their horoscope
    userModel.find({ "preferences.googleCalUpdates": true })
    .then((users)=>{
        users.forEach((user)=>{
            horoscopeModel.find({sign: user.sign, house: user.house, moonPhase: phase})
            .then((hs)=>{
                calendarAdd(user, hs[0], date);
            })
            .catch((err)=>{
                console.error("Error in finding hs: " + err);
            })
            
        })
    })
    .catch((err)=>{
        console.error("Error in finding users: " + err);
    })
 }

export async function sendEmailAll(date, phase) { // date and number
    //send email right now to all users with email setup for that horoscope. date can be used for email content, but it should send right now
    userModel.find({ "preferences.emailUpdates": true })
    .then((users)=>{
        users.forEach((user)=>{
            let context = {
                date: date,
                phase: phase
            }
            let localDate = UTCDateToTimezone(date, user.timezoneOffset);
            let emailJob = new cron.CronJob(localDate, () => {
                horoscopeModel.find({sign: user.sign, house: user.house, moonPhase: phase})
                .then((hs)=>{
                    message(user, hs[0], date);
                })
                .catch((err)=>{
                    console.error("Error in finding hs: " + err);
                })
            }, undefined, undefined, undefined, context); // undefined = leaving out the parameter.
            emailJob.start();
        })
    })
    .catch((err)=>{
        console.error("Error in finding users: " + err);
    })
 }