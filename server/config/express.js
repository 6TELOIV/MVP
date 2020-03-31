import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoSession from 'connect-mongo';
import passport from 'passport'

import localStrategy from '../strategies/local.js'
import apiRouter from '../routes/api.routes.js';
import userModel from '../models/userModel.js';

const MongoStore = mongoSession(session);

export const init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(config.db.uri, {
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
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    }));
    
    app.use((req, res, next) => {
        console.log('req.session', req.session);
        next();
    });

    //Passport
    app.use(passport.initialize());
    app.use(passport.session()); //calls serializeUser and deserializeUser

    passport.use(localStrategy);
    passport.serializeUser((user, done) => {
        console.log('*** serializeUser called, user: ')
        console.log(user) // the whole raw user object!
        console.log('---------')
        done(null, { _id: user._id })
    });
    passport.deserializeUser((id, done) => {
        console.log('DeserializeUser called')
        userModel.findOne(
            { _id: id },
            'username',
            (err, user) => {
                console.log('*** Deserialize user, user:')
                console.log(user)
                console.log('--------------')
                done(null, user)
            }
        )
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

