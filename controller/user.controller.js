// import User from "../model/user.model.js"
import User from "../model/user.model.js"
import errorHandler from "../utils/errorHandler.js";

const asyncHandler = (fn) => (req,res,next) =>
    Promise.resolve(fn(req,res,next)).catch(next)

export const addUserController = asyncHandler( async(req,res,next) => {
    const {name,age} = req.body;
    const user = await User.create({name,age})
    if(!user){
            return(next(new errorHandler("user not created", 400)))
    }
    res.status(200).json({success:true , message:"user created successfully", data:{"name" : name, "age" : age}})
})
export const retriveUserController = asyncHandler(async(req,res,next) => {
        const user = await User.find()
        console.log(user)

        res.status(200).json({success: true, message: "succesfully retrieved", data:user})
})
export const retriveUserById = asyncHandler( async(req,res,next) => {

        const user = await User.findById(req.params.id)

        
        res.status(200).json({success: true, message:"user found", data:user})

})
export const updateUser = asyncHandler (async(req,res,next) => {
        const newData = req.body
        const user = await User.findByIdAndUpdate(req.params.id, newData ,{new:true})
        res.status(200).json({success:true , message : "user update" , data: user})
})
export const updateUserPatch = asyncHandler( async(req,res,next) => {
            const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true } 
        );
        res.status(202).json({success: true, message: "user updated sccesfully" , data: updatedUser})
})
export const deleteUser = asyncHandler( async(req,res,next) => {
    const user = await User.findByIdAndDelete(
         req.params.id,
    )
    if(!user){
        return(next(new errorHandler("user not found woo hoo",401)))

    }
        res.status(200).json({success : true , message: "user deleted" , data: user})
})
