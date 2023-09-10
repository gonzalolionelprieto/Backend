// sessionRoutes.js
import express from "express";
import sessionController from "../controllers/sessionController.js";

const sessionRouter = express.Router();

sessionRouter.post("/register", sessionController.register);
sessionRouter.post("/login", sessionController.login);
sessionRouter.get("/user/getpreference", sessionController.getPreference);
sessionRouter.post("/logout", sessionController.logout);
sessionRouter.get("/user/admin", sessionController.adminProtected);



export default sessionRouter;
