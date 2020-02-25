import express from 'express';
import * as accountController from '../controllers/account.controller.js';
const apiRouter = express.Router();

apiRouter.post('/signup', accountController.signUp);

export default apiRouter;