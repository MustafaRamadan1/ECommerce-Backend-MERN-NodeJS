import AppError from "../utils/appError";

const validation = (schema) => (req, res, next) => {
  let errorCollection = [];
  const checkParts = ["body", "query", "params"];

  checkParts.forEach((e) => {
    if (req[e]) {
      const { error } = schema.body.validate(req[e], { abortEarly: false });

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
    console.log(`success`);
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
