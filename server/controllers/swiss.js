import swisseph from 'swisseph';
import geoTz from 'geo-tz';
import ct from 'countries-and-timezones'
import isDST from 'is-dst'
import path from 'path'

export const testSwiss = async (req, res) => {
    let flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;//swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SPEED | swisseph.SEFLG_EQUATORIAL;//
	
    let date = new Date(0);
    //  let lat = 33.543682; //Katie
    //  let lng = -86.779633; 

    // let lat = 27.9477595; //Shaun
    // let lng = -82.458444;

    // let lat = 30.3322; //Sabrina
    // let lng = -81.6557;

    let lat = 42.9317; //Mom
    let lng = -76.5661;

    //date.setUTCSeconds(964012620); //Shaun
    //date.setUTCSeconds(940874640);//940878240) //Katie
    //date.setUTCSeconds(957888000) //Sabrina
    date.setUTCSeconds(-43951680); //Mom

    let tz = geoTz(lat, lng);
    console.log(tz)
    let DST = isDST(date);
    let off;
    if(DST){
        off = -(ct.getTimezone(tz).dstOffset);
    }else{
        off = -(ct.getTimezone(tz).utcOffset);
    }
    off = off / 60;
    console.log(off);


    console.log((date.getMonth() + 1) + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.getHours() + ' ' + date.getMinutes())

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = (date.getHours() + off) + (date.getMinutes() / 60);
	
	let julday_ut, house, sunHouse;
	try {
		julday_ut = swisseph.swe_julday (year, month, day, hour, swisseph.SE_GREG_CAL);
        //TO-DO If no bday time, use sunHouse as house
        console.log(swisseph.swe_revjul(julday_ut, 1))
        //console.log(swisseph.swe_houses (julday_ut, lat, lng, 'W'))
        house = (swisseph.swe_houses (julday_ut, lat, lng, 'W').ascendant);

        console.log(house);
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
        console.log(swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag));
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
        

        let r = {
            house: house,
            sign: sunHouse
        }
        res.send(r);
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
}
	