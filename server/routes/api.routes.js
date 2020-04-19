import express from "express";
import passport from "passport";

import * as accountController from "../controllers/account.controller.js";
import coordinatesController from "../controllers/coordinates.controller.js";
import * as adminController from "../controllers/admin.controller.js";
import * as googleController from "../controllers/google.controller.js";
const apiRouter = express.Router();

apiRouter.post("/signup", coordinatesController, accountController.signUp);
apiRouter.post(
  "/signin",
  passport.authenticate("local"),
  accountController.signIn
);
apiRouter.delete("/signout", accountController.signOut);
apiRouter.get("/getUserInfo", accountController.getUserInfo);

apiRouter.get("/admin", adminController.getEntries);
apiRouter.put("/admin", adminController.edit);
apiRouter.post("/admin", adminController.reset);

apiRouter.put("/googleauth", googleController.auth);
apiRouter.get("/googleauth/callback", googleController.callback);
apiRouter.put("/googledeauth", googleController.deAuth);

apiRouter.put("/updatePreferences", accountController.updatePreferences);

export default apiRouter;
