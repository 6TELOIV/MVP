import swisseph from 'swisseph';
import geoTz from 'geo-tz';
import ct from 'countries-and-timezones'
import isDST from 'is-dst'
import passport from 'passport'

import userModel from '../models/userModel.js';


/* req: {
	long,
	lat,
	name,
	email,
	birthday [UTC i.e. let date = new Date(0); date.setUTCSecconds(birthday)]
		See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime}
*/
export const signUp = async (req, res) => {
	let flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
	let date = new Date(0);
	let julday_ut, house, sunHouse;

	try{
		date.setUTCSeconds(req.body.birthday);
		
		//Shaun's Code for Handling Timezones and Daylight Savings
		let tz = geoTz(req.body.lat, req.body.long);
		console.log(tz)
		let DST = isDST(date);
		let off;
		if(DST){
			off = -(ct.getTimezone(tz).dstOffset);
		}else{
			off = -(ct.getTimezone(tz).utcOffset);
		}
		off = off / 60;
		//console.log(off);


		//console.log((date.getMonth() + 1) + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.getHours() + ' ' + date.getMinutes())

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = (date.getHours() + off) + (date.getMinutes() / 60);
		
		julday_ut = swisseph.swe_julday (year, month, day, hour, swisseph.SE_GREG_CAL);
		//TO-DO If no bday time, use sunHouse as house
		house = (swisseph.swe_houses (julday_ut, req.body.lat, req.body.long, 'W').ascendant);

		//console.log(house);
		if(house < 29.99 && house > 0){
			house = 1;
		}else if(house < 59.99 && house >= 30){
			house = 2;
		}else if(house < 89.99 && house >= 60){
			house = 3;
		}else if(house < 119.99 && house >= 90){
			house = 4;
		}else if(house < 149.99 && house >= 120){
			house = 5;
		}else if(house < 179.99 && house >= 150){
			house = 6;
		}else if(house < 209.99 && house >= 180){
			house = 7;
		}else if(house < 239.99 && house >= 210){
			house = 8;
		}else if(house < 269.99 && house >= 240){
			house = 9;
		}else if(house < 299.99 && house >= 270){
			house = 10;
		}else if(house < 329.99 && house >= 300){
			house = 11;
		}else if(house < 359.99 && house >= 330){
			house = 12;
		}

		//house = Math.round((swisseph.swe_houses (julday_ut, lat, lng, 'W').house[0] + 60) / 30);//.house[0] / 30;
		//console.log(swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag));
		sunHouse = swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag).longitude;
		if(sunHouse < 29.99 && sunHouse > 0){
			sunHouse = 1;
		}else if(sunHouse < 59.99 && sunHouse >= 30){
			sunHouse = 2;
		}else if(sunHouse < 89.99 && sunHouse >= 60){
			sunHouse = 3;
		}else if(sunHouse < 119.99 && sunHouse >= 90){
			sunHouse = 4;
		}else if(sunHouse < 149.99 && sunHouse >= 120){
			sunHouse = 5;
		}else if(sunHouse < 179.99 && sunHouse >= 150){
			sunHouse = 6;
		}else if(sunHouse < 209.99 && sunHouse >= 180){
			sunHouse = 7;
		}else if(sunHouse < 239.99 && sunHouse >= 210){
			sunHouse = 8;
		}else if(sunHouse < 269.99 && sunHouse >= 240){
			sunHouse = 9;
		}else if(sunHouse < 299.99 && sunHouse >= 270){
			sunHouse = 10;
		}else if(sunHouse < 329.99 && sunHouse >= 300){
			sunHouse = 11;
		}else if(sunHouse < 359.99 && sunHouse >= 330){
			sunHouse = 12;
		}


		// julday_ut = swisseph.swe_julday (year, month, day, hour, swisseph.SE_GREG_CAL);
		// //TO-DO If no bday time, use sunHouse as house
		// house = swisseph.swe_houses (julday_ut, req.body.lat, req.body.long, 'W').house[0] / 30;
		// sunHouse = Math.floor(swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag).longitude / 30);
	} catch (error) {
		console.error(error);
		res.status(500).send({
			errors: [
				{
					location: 'swisseph',
					msg: 'House/Sign Calculation Error'
				}
			]
		})
		return;
	}
	
	try {
		let found = await userModel.findOne({
			username: req.body.email
		});
		if (found) {
			res.status(400).send({
				errors: [
					{
						location: 'database',
						msg: 'Username taken'
					}
				]
			})
		} else {
			await userModel.create({
				name: req.body.name,
				username: req.body.email,
				password: req.body.password,
				isAdmin: false,
				house: house,
				sign: sunHouse
			});
			res.send("User created").status(200);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({
			errors: [
				{
					location: 'database',
					msg: 'Database write error'
				}
			]
		})
		return;
	}
	
	res.status(200).end();
}
/**
* req = {
*   username,
*   password
* }
*/
export const signIn = async(req, res) => {
	let foundRevised = {
		name: req.user.name,
		username: req.user.username,
		isAdmin: req.user.isAdmin,
		house: req.user.house,
		sign: req.user.sign
	}

	if(req.user.isAdmin){
		req.session.passport.user.isAdmin = true;
	}
	res.status(200).send(foundRevised);
}

export const signOut = async(req, res) => {
	req.session.destroy();
	res.status(200).send("Successfully Logged Out");
}

export const getUserInfo = async(req, res) => {
	try{
		if(!req.session.passport.user._id){
			res.status(200).send(null); //Sends null to trigger login
			return;
		}
		let found = await userModel.find({_id: req.session.passport.user._id});
		
		if(!found) res.status(400).end();

		found = found[0];
		let foundRevised = {
			name: found.name,
			username: found.username,
			house: found.house,
			sign: found.sign
		}
		res.status(200).send(foundRevised);

	}catch{
		res.status(200).send(null);
	}
}
	