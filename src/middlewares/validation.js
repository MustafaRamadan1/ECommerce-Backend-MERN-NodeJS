import AppError from "../utils/appError";

const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    
   const message =  createErrorMsg(error);

   return next(new AppError(`Invalid input data ${message}`, 400));

  } else {
    next();
    console.log(`success`);
  }
};

export default validation;



function createErrorMsg (error){
    let msg = "";
    if (error.details.length > 1) {
      error.details.forEach((e) => {
        msg += e.message + " , ";
      });
    } else {
      msg = error.details[0].message;
    }

    return msg;
}