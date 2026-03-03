import { sendEmail } from "../config/nodeMailer.config.js";
import { generateOtp } from "../config/otp.config.js";
import Otp from "../model/otp.model.js";
import cron from "node-cron";



export const createOtp = async (req,res) => {
    const {email} = req.body;
    try {
         const otp = generateOtp();
         const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
         await Otp.deleteMany({email});
         await Otp.create({email,otp,expiresAt});
         await sendEmail(
            email,
            "Your OTP Code",
            `<h1>Your OTP Code</h1><p>Your OTP code is: <b>${otp}</b>. It will expire in 5 minutes.</p>`
        )
         res.status(200).json({success : true , message : "OTP created successfully" , otp})
    }catch(err){
        res.status(500).json({success : false , message : "Failed to create OTP" , error : err.message})
    }
}

cron.schedule("*/1 * * * *", async () => {

  console.log("Expired OTPs cleared");
});

export const verifyOtp = async(req,res) => {
    const {email, otp} = req.body;
    try {
         const record  = await Otp.findOne({email,otp})
         if(!record){
            return res.status(400).json({success : false , message : "Invalid OTP"})
         }
         if(record.expiresAt < new Date()){
            res.status(400).json({success : false , message : "OTP has expired"})
         }
         if(record.isUsed){
            res.status(400).json({success : false , message : "OTP has already been used"})
         }
         record.isUsed = true;
         await record.save();
         res.status(200).json({success : true , message : "OTP verified successfully"})
    }catch(err){
        res.status(500).json({success : false , message : "Failed to verify OTP" , error : err.message})
    }
}