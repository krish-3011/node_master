export const otherMiddleware = (req,res,next) => {
    console.log("other middlware access" + JSON.stringify(req.user))
    next()
}