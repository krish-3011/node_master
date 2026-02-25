import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
})

export default mongoose.model("Login", loginSchema)