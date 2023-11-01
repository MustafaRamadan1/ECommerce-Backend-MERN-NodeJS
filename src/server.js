import connectDb  from './DB/Connection';


connectDb();

process.on('uncaughtException', (err)=>{
    console.log(`Error is : ${err.message}`);
})

