const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const catchAsync= require('../utils/catchAsync');


const signUp = catchAsync(async (req, res, next) =>{
    
    console.log('here is signUp');

    res.status(200).json({
        status: 'success',
    })
})




module.exports = {signUp}



