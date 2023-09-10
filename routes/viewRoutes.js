// viewRoutes.js
import express from "express";
import viewController from "../controllers/viewController.js";

const viewRouter = express.Router();

viewRouter.get("/", viewController.showRegister);
viewRouter.get("/login", viewController.showLogin);
viewRouter.get("/profile", viewController.showProfile);
viewRouter.get("/logout", viewController.showLogout);

export default viewRouter;
