import express from 'express';
import passport from 'passport';

import * as accountController from '../controllers/account.controller.js';
import coordinatesController from '../controllers/coordinates.controller.js'
import * as adminController from '../controllers/admin.controller.js'
const apiRouter = express.Router();

apiRouter.post('/signup', coordinatesController, accountController.signUp);
apiRouter.post('/signin', passport.authenticate('local'), accountController.signIn);
apiRouter.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile']}));
apiRouter.get('/authcallback', passport.authenticate('google', 
    { failureRedirect: 'http://localhost:3000/googleauth', session: false }),
    (req, res) => {
        if(!req.session.passport){
            res.redirect('http://localhost:3000/login');
        }
        req.session.passport.user.googleToken = req.user.token;
        console.log(req.session);
        res.redirect('http://localhost:3000/UserDashboard')
    }
);
apiRouter.delete('/signout', accountController.signOut);
apiRouter.get('/getUserInfo', accountController.getUserInfo);
apiRouter.get('/admin', adminController.getEntries);
apiRouter.put('/admin', adminController.edit);
apiRouter.post('/admin', adminController.reset);

export default apiRouter;