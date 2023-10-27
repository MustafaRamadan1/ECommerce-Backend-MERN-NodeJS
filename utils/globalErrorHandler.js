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