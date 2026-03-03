import express from "express"
import cors from "cors"
import db from "./config/db.config.js"
import userRoute from "./routes/user.route.js"
import loginRoute from "./routes/login.route.js"
import workoutRouter from "./routes/workout.route.js"
import fileRouter from "./routes/files.routes.js"
import mailRouter from "./routes/mail.routes.js"


const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    res.send("hello world")
})

app.get("/num",(req,res) => {
    res.send("hello ").status(200)
})

app.use("/user", userRoute)
app.use("/v1", loginRoute)
app.use("/workout",workoutRouter)
app.use("/file", fileRouter)
app.use("/mail", mailRouter)

db.then(
app.listen(8000 , ()=>{
    console.log("app listning on PORT : 8000")
}))

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message : err.message || "interal server error"
    })
})