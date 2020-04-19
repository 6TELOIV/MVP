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
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    //Passport
    app.use(passport.initialize());
    app.use(passport.session()); //calls serializeUser and deserializeUser

    passport.use(localStrategy);

    passport.serializeUser((user, done) => {
        done(null, { _id: user._id });
    });
    passport.deserializeUser((id, done) => {
        userModel.findOne(
            { _id: id },
            'username',
            (err, user) => {
                done(null, user)
            }
        )
    });

    // add a router
    app.use('/api/', apiRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(path.resolve(), './client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(path.resolve(), './client/build', 'index.html'));
        });
    } else {
        // Redirect to react server
        app.get('*', (req, res) => {
            res.redirect("http://localhost:3000" + req.path);
        })
    }

    return app
}

