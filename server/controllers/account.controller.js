import swisseph from 'swisseph';
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
	date.setUTCSeconds(req.body.birthday);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours() + (date.getMinutes() / 60);
	
	let julday_ut, house, sunHouse;
	try {
		julday_ut = swisseph.swe_julday (year, month, day, hour, swisseph.SE_GREG_CAL);
		//TO-DO If no bday time, use sunHouse as house
		house = swisseph.swe_houses (julday_ut, req.body.lat, req.body.long, 'W').house[0] / 30;
		sunHouse = Math.floor(swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag).longitude / 30);
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
				house: house + 1,
				sign: sunHouse + 1
			});
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
		house: req.user.house,
		sign: req.user.sign
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
	