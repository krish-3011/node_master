import { Router } from "express";
import { addWorkout, getAllPR, getPR, xyzfunc } from "../controller/workout.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { xyzMiddleware } from "../middleware/xyz.middleware.js";
import { otherMiddleware } from "../middleware/other.middleware.js";

const workoutRouter = Router()

workoutRouter.post("/add",auth,addWorkout);
workoutRouter.post("/pr",auth,getPR)
workoutRouter.get("/allpr",auth,getAllPR)
workoutRouter.get("/xyz",xyzMiddleware,xyzfunc)



export default workoutRouter