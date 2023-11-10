import mongoose, { connect } from 'mongoose';

import dotenv from 'dotenv';

import app from '../app';

dotenv.config();



const connectDb = () =>{

    const port = process.env.port || 3000;
    
    mongoose.connect(process.env.DB_LINK).then(()=>{
        console.log(`Connection Success`);
        app.listen(port, '127.0.0.1', ()=>console.log(`Server is running on port ${port}`));
        
      }).catch((err)=>console.log(err.message));
};

export default connectDb;


