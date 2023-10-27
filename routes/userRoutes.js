const express = require('express');


const {signUp } = require('../controllers/userController');


const router = express.Router();


router.get('/test', signUp);



module.exports = router;