import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js";
import Job from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async(req,resizeBy,next)=>{
    const {title,jobType,location,companyName,introduction,responsibilities, qualifications,offers,salary, hiringMultipleCandidates,personalWebsiteTitle,personalWebsiteUrl, jobNiche} = req.body;
    if(!title|| !jobType|| !location|| !companyName|| !introduction|| !responsibilities|| !qualifications || !salary|| !jobNiche){ //checking to see if the user failed to provide any of these
        return next(new ErrorHandler("Please provide full job details.",400))
    }
    if((personalWebsiteTitle && !personalWebsiteUrl) || (!personalWebsiteTitle && personalWebsiteUrl)){
        return next(new ErrorHandler("Provide both the website url and title, or leave both blank.",400))
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title,jobType,location,companyName,introduction,responsibilities, qualifications,offers,salary, hiringMultipleCandidates,personalWebsite:{title: personalWebsiteTitle,url: personalWebsiteUrl}, jobNiche
    })

    resizeBy.status(201).json({ //201 means created successfully
        success: true,
        message: "Job posted successfully.",
        job,
        postedBy
    })
})

