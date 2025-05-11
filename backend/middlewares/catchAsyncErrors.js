export const catchAsyncErrors = (func)=>{  
    return (req, res, next)=>{
        Promise.resolve(func(req,res,next)).catch(next);
    };
};

// wrap any async route handler 
// so that if it throws an error or rejects a promise, 
// the error automatically goes to next(), without needing a try catch block for every async func