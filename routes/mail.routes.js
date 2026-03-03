import { Router } from "express";
import { sendEmail } from "../config/nodeMailer.config.js";
import { createOtp, verifyOtp } from "../controller/otp.controller.js";

const mailRouter = Router();

mailRouter.get("/test-mail", async (req,res) => {
    try{
        await sendEmail(
            "patelkrish301124@gmail.com",
            "Test Email from Node.js",
            "<h1>Hello from Node.js</h1><p>This is a test email sent using Nodemailer.</p>"
        )
        res.status(200).json({success : true , message : "Email sent successfully"})
    }catch(err){
        res.status(500).json({success : false , message : "Failed to send email" , error : err.message})
    }
})

mailRouter.post("/otp-mail", createOtp)
mailRouter.post("/otp-verify", verifyOtp)

export default mailRouter;