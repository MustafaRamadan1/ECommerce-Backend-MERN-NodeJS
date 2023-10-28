import rateLimit from "express-rate-limit";


const limiter = (maxRequests , durationPerMilliSeconds) => rateLimit({
    max: maxRequests, 
    windowMs: durationPerMilliSeconds, 
    message:  `Too many requests from this IP, please try again after ${durationPerMilliSeconds / 60000} Minutes`,
});


export default limiter;