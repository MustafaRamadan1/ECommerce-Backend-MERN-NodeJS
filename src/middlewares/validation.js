import AppError from "../utils/appError";

const validation = (schema) => (req, res, next) => {
  let errorCollection = [];
  const checkParts = ["body", "query", "params"];
  // if(schema["params"]) console.log("we are in the params");
  checkParts.forEach((key) => {
    if (schema[key]) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        const message = createErrorMsg(error);
        errorCollection.push(message);
      }
    }
  });

  if (errorCollection.length > 0) {
    return next(
      new AppError(`Invalid input data ${errorCollection.join(" , ")}`, 400)
    );
  } else {
    next();
  }
};

export default validation;

function createErrorMsg(error) {
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
