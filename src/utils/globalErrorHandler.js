import AppError from "./appError";

const developmentError = (error, res) =>{
    
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error: error,
        stack: error.stack
    })
};


const productionError = (err, res) =>{

    if (err.isOperational)
    {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    else{
        console.error("ERROR", err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
}



const duplicateErrorHandler = (err, res)=>{
    
    const message = `The duplicate key is ${Object.keys(err.keyPattern)[0]} and the value is ${Object.values(err.keyValue)[0]}`;

    return new AppError(message, 409 )
}
const globalErrorHandler = (error, req, res, next) =>{

    error.statusCode = error.statusCode || 500;

    error.status = error.status || 'error';

    if (process.env.NODE_ENV === "Development")
    {
        developmentError(error, res);
    }
    else 
    {
        let err = {...error};

        if (err.code ===11000) err = duplicateErrorHandler(err, res);
        productionError(err, res);
    }
};
export default globalErrorHandler;