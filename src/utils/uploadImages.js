import multer from "multer";
import sharp from "sharp";
import AppError from "./appError";

const uploadImages = (fieldsArray) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError(`Please Upload a valid Image`, 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload.fields(fieldsArray);
};

const resizeImages = async (req, res, next) => {
  const filesElements = Object.keys(req.files);
  console.log(filesElements);
  console.log(req.files);

  const fields = req.files;
  try {
    for (let element of filesElements) {
      if (fields[element].length === 1) {
        const file = await processOneFile(fields[element][0]);
        console.log(`file is ${file}`);
      } else if (fields[element].length > 1) {
        const files = await processMultipleFiles(fields[element]);
        console.log(files);
      }
    }
    next();
  } catch (error) {
    return next(new AppError("Error in Resizing Images", 400));
  }
  // filesElements.forEach(async (element)=>{
  //     console.log(req.files[element]);
  //     if(req.files[element].length === 1){

  //         await sharp(req.files[element][0].buffer)
  //         .resize(400, 400)
  //         .toFormat('jpeg')
  //         .toFile(`${__dirname}/../images/${Date.now()}-${req.files[element][0].originalname}`)
  //     } else if(req.files[element].length > 1){
  //         req.files[element].forEach(async (e, index)=>{

  //         await sharp(e.buffer)
  //         .resize(400, 400)
  //         .toFormat('jpeg')
  //         .toFile(`${__dirname}/../images/${index +1}-${e.originalname}`)
  //         })
  //     }
  // })
};

const processOneFile = async (field) => {
  const pathFile = `${Date.now()}-${field.originalname}`;
  await sharp(field.buffer)
    .resize(400, 400)
    .toFormat("jpeg")
    .toFile(`${__dirname}/../images/${pathFile}`);
  return pathFile;
};

const processMultipleFiles = async (fieldsArray) => {
  const filesPaths = [];
  await Promise.all(
    fieldsArray.map(async (e, index) => {
      const filepath = `${index + 1}-${e.originalname}`;
      await sharp(e.buffer)
        .resize(400, 400)
        .toFormat("jpeg")
        .toFile(`${__dirname}/../images/${filepath}`);
      filesPaths.push(filepath);
    })
  );
  return filesPaths;
};

export default { uploadImages, resizeImages };
