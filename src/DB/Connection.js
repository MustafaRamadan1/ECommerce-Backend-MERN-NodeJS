import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';
import logger from '../utils/logger';

dotenv.config();



const connectDb = () =>{

    const port = process.env.port || 3000;
    
    mongoose.connect(process.env.DB_LINK).then(()=>{
        console.log(`Connection Success`);
        logger.info('connection Success');
        app.listen(port, '127.0.0.1', ()=>{
          logger.info(`Server listening on PORT ${port}`);
          console.log(`Server is running on port ${port}`)
        });
        
      }).catch((err)=>{
        logger.error(err.message);
        console.log(err.message)
      });
};

export default connectDb;


