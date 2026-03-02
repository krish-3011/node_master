import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
import User from "../model/user.model.js"
import Login from "../model/login.model.js"

configDotenv()
export const auth = async(req,res,next) =>{
    let token = null;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid auth format" });
    }

        try{
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded)
            const user = await Login.findById(decoded._id).select("-password")
            console.log(user)
            if(!user){
                return res.status(400).json({message : "user not authorizes"})
            }
            req.user = user

            console.log("auth user" + req.user)
            next()

        }
        catch(err){
                    return res.status(401).json({message : "user toke error"})
        }
    
}