const mongoose = require('mongoose');


const app = require('./app');

const dotenv= require('dotenv');

dotenv.config({path: `${__dirname}/config.env`});

// mongoose.connect(process.env.DB_LINK).then(()=>console.log(`Connection success`)).catch(()=>console.log(`Connection Failed`));

mongoose.connect(process.env.DB_LINK).then(()=>console.log(`Connection success`)).catch((err)=>console.log(err));


const port = process.env.PORT || 3000;

app.listen(port, '127.0.0.1', ()=>console.log(`Server is running on port ${port}`));