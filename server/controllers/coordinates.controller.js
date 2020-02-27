import config from '../config/config.js';
import request from 'request';

export default (req, res, next) => {
    if (req.body.address) {
        const addressTemp = req.body.address;

        const options = {
            q: addressTemp,
            key: config.openCage.key,
        };

        // The below code makes a GET request to the specified URL.
        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            qs: options
        }, async (error, response, body) => {
            //https://opencagedata.com/tutorials/geocode-in-nodejs
            if(error) console.log("error", error.message);

            body = JSON.parse(body);
            body = body.results[0].geometry;

            console.log("Coordinates JSON ->  " + JSON.stringify(body));
            req.results = body;

            next();
        });
    } else {
        next();
    }
};  
