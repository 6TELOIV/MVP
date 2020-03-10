import config from '../config/config.js';
import request from 'request';

export default (req, res, next) => {
    if (req.body.address) {
        const addressTemp = req.body.address;

        const options = {
            q: addressTemp,
            key: process.env.OPENCAGE_KEY || config.openCage.key,
        };

        // The below code makes a GET request to the specified URL.
        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            qs: options
        }, async (error, response, body) => {
            //https://opencagedata.com/tutorials/geocode-in-nodejs
            if(error) {
                console.error(error);
                res.status(500).send({
                    errors: [
                        {
                            location: 'coordinates',
                            msg: 'Error getting coordinates'
                        }
                    ]
                });
            }

            body = JSON.parse(body);
            if(!body.results[0] || !body.results[0].geometry){
                res.status(400).send({
                    errors: [
                        {
                            location: 'coordinates',
                            msg: 'No coordinates found'
                        }
                    ]
                });
            }
            req.body.lat = body.results[0].geometry.lat;
            req.body.long = body.results[0].geometry.lng;
            next();
        });
    } else {
        next();
    }
};  
