import connectDb  from './DB/Connection';
import logger  from './utils/logger';

connectDb();

process.on('uncaughtException', (err)=>{
    logger.error(`Error is : ${err.message}`)
    // console.log(`Error is : ${err.message}`);
})
