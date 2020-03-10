import swisseph from 'swisseph';
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
	