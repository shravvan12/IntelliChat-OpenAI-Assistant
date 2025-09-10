import {Router} from "express";
import appRouter from "./index.js";
import { getAllUsers, userLogin, userLogout, userSignup, VerifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator , validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup", validate(signupValidator) ,userSignup);
userRoutes.post("/login", validate(loginValidator) , userLogin);
userRoutes.get("/auth-status" ,verifyToken, VerifyUser);
userRoutes.get("/logout",verifyToken,userLogout);

export default userRoutes;