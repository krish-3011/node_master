export const xyzMiddleware = (req,res,next) => {
    req.user = {name : "xyz"}
    // console.log("other middlware access" + req.user)
    next()
}