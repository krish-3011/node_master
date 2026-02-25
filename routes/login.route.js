import { Router } from "express";
import { loginUser, registerUser } from "../controller/login.controller.js";

const loginRoute = Router()

loginRoute.post("/",registerUser)
loginRoute.post("/login/", loginUser)


export default loginRoute