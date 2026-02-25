import jwt from "jsonwebtoken"
import Login from "../model/login.model.js"
import errorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt"
import { configDotenv } from "dotenv";


const envRes = configDotenv()

const asyncHandler = (fn) =>(req,res,next)  => 
    Promise.resolve(fn(req,res,next)).catch(next)

export const registerUser = asyncHandler(async(req,res,next) => {
    // console.log(process.env.SECRET_KEY)
    const {name,email,password} = req.body

    const user = await Login.findOne({email})
    if(user){
        return(next(new errorHandler("email already exist",402)))
    }
    const hashpasswd = await bcrypt.hash(password,9)
    const newUser = await Login.create({
        "name" : name,
        "email" : email,
        "password" : hashpasswd
    })
    res.status(200).json({success: true, message:"user created", data: newUser})
})
export const loginUser = asyncHandler( async(req,res,next) => {
    // console.log(env.SECRET_KEY)
    const {name,email,password} = req.body
    const user = await Login.findOne({email})
    if(!user){
        return(next(new errorHandler("email doent exist",401)))
    }
    if(user.name !== name){
         return(next(new errorHandler("username doent exist",401)))
    }
    const pass = await bcrypt.compare(password, user.password)
    if(!pass){
        return(next(new errorHandler("password is incoreecr",402)))
    }
        const token = await jwt.sign(
        { _id : user._id  },
        process.env.SECRET_KEY,
        { expiresIn: '1h' });
    if(token){
        res.status(200).json({success:true, message:"user logged in succesfully" , data: user,token:token})
    }
})


