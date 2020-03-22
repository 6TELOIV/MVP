import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

import apiRouter from '../routes/api.routes.js';
import config from './config.js';

export const init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    app.use(session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false
    }));
    
    app.use((req, res, next) => {
        console.log('req.session', req.session);
        next();
    });

    // add a router
    app.use('/api/', apiRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

