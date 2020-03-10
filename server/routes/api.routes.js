import express from 'express';
import * as accountController from '../controllers/account.controller.js';
import coordinatesController from '../controllers/coordinates.controller.js'
const apiRouter = express.Router();

apiRouter.post('/signup', coordinatesController, accountController.signUp);
apiRouter.post('/signin', accountController.signIn)

export default apiRouter;