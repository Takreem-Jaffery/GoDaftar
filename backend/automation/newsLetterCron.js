import cron from "node-cron";
import {Job} from "../models/jobSchema.js";
import {User} from "../models/userSchema.js"
import {sendEmail} from "../utils/sendEmail.js"

//node-cron is for scheduling tasks 
export const newsLetterCron = ()=>{
    //each star syntax represents: 
    //minutes hours days month(e.g 12 means it'll run once in december NOT that it'll run after 12 months) weekdays(e.g 5 represents wednesday we start counting from saturday) 
    cron.schedule("*/1 * * * *",async()=>{
        console.log("Running Cron Automation.")
        const jobs = await Job.find({newsLettersSent: false});
        for(const job of jobs){
            try{
                const filteredUsers = await User.find({
                    $or:[
                        {"niches.firstNiche":job.jobNiche},
                        {"niches.secondNiche":job.jobNiche},
                        {"niches.thirdNiche":job.jobNiche}
                    ]
                });
                for(const user of filteredUsers){
                    const subject = `New Job Alert! ${job.title} in ${job.jobNiche} Available Now`;
                    const message = `Hi ${user.name},\n\nGreat news! A job that fits your niche of interest has 
                    just been posted on GoDaftar. The job details are as follows:\n
                    **Position:** ${job.title}\n
                    **Company:** ${job.companyName}\n
                    **Location:** ${job.location}\n
                    **Salary:** ${job.salary}\n\n
                    Don't wait too long to apply! Job openings like these are filled quick. We hope we were able
                    to support you in your job search journey.\n\n Best of luck!\n\nRegards,\nGoDaftar Team`;
                    sendEmail({
                        email:user.email,
                        subject,
                        message
                    });
                }
                job.newsLettersSent=true;
                await Job.save();
            }catch(err){
                console.log("Error in node Cron catch block.")
                return next(console.error(error||"Some error in Cron."));
            }
        }
    });
}