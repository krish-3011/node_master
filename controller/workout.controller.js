import { addWorkoutService, calculateAllPr, calculatePr } from "../service/workout.service.js"

export const addWorkout = async(req,res) => {
    const user_id = req.user._id
    console.log(user_id)
    const workout = await addWorkoutService(req.body,user_id)
    res.status(200).json({success: true, message : "workout added succesfully" , data: workout})
}

export const getPR = async(req,res) => {
    const user_id = req.user._id

    const pr = await calculatePr(req.body,user_id)
    return res.status(200).json({success : true , meddage : "pr calculated" , data : pr})
}

export const getAllPR = async(req,res) => {
    const user_id = req.user._id
    console.log("tpe of user_id" + typeof(user_id))

    const pr = await calculateAllPr(user_id)
    return res.status(200).json({success : true , meddage : "pr calculated" , data : pr})
}
export const xyzfunc = (req,res) => {
    console.log("xyz func access" + JSON.stringify(req.user))
    res.status(200).json({success : true , message : "xyz func access" , data : req.user})
}