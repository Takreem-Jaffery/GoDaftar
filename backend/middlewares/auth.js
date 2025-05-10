
//code needed for tj part
export const isAuthorized = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} not allowed to access this resource.`));
        }
        next();
    }
}