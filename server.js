import mongoose from 'mongoose'



// import app from './app'

// console.log(app)
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

// mongoose.connect(process.env.DB_LINK).then(()=>console.log(`Connection success`)).catch(()=>console.log(`Connection Failed`));

mongoose.connect(process.env.DB_LINK).then(()=>{
  console.log(`Connection Success`);
  app.listen(port, '127.0.0.1', ()=>console.log(`Server is running on port ${port}`));
  
}).catch((err)=>console.log(err));





