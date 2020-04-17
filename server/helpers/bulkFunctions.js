import userModel from '../models/userModel.js';
import horoscopeModel from '../models/horoscopeModel.js';
import { calendarAddFromServer } from '../controllers/google.controller.js';
import { message } from './emailer';

export async function addCalendarAll(date, phase) { // date and number
    //add calendar event to all users with google setup for that date and their horoscope
    userModel.find({calEnabled: true})
    .then((users)=>{
        users.forEach((user)=>{
            horoscopeModel.find({sign: user.sign, house: user.house, moonPhase: phase})
            .then((hs)=>{
                calendarAddFromServer(user, hs, date);
            })
            .catch((err)=>{
                console.log("Error in finding hs: " + err);
            })
            
        })
    })
    .catch((err)=>{
        console.log("Error in finding users: " + err);
    })
 }

export async function sendEmailAll(date, phase) { // date and number
    //send email right now to all users with email setup for that horoscope. date can be used for email content, but it should send right now
    userModel.find({emailEnabled: true})
    .then((users)=>{
        users.forEach((user)=>{
            horoscopeModel.find({sign: user.sign, house: user.house, moonPhase: phase})
            .then((hs)=>{
                message(user, hs, date);
            })
            .catch((err)=>{
                console.log("Error in finding hs: " + err);
            })
            
        })
    })
    .catch((err)=>{
        console.log("Error in finding users: " + err);
    })
 }