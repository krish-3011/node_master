import { Router } from "express";
import { addUserController, deleteUser, retriveUserById, retriveUserController, updateUser, updateUserPatch } from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";


const userRoute = Router()


userRoute.post("/",addUserController)
userRoute.get("/all",auth,retriveUserController)
userRoute.get("/find/:id", retriveUserById)
userRoute.put("/update/:id",updateUser)
userRoute.patch("/update/:id",updateUserPatch)
userRoute.delete("/del/:id",deleteUser)


export default userRoute;