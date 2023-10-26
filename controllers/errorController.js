const developmentError = (error, res) =>{
    
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error: error,
        stack: error.stack
    })
};

const globalErrorHandler = (error, req, res, next) =>{

    if (process.env.NODE_ENV === "Development")
    {
        developmentError(error, res);
    }
    else 
    {
        let err = {...error};
    }
};


module.exports = globalErrorHandler;