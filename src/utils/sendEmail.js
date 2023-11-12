// import nodemailer from 'nodemailer';
// import {config} from 'dotenv';

const nodemailer = require('nodemailer');
const config = require('dotenv').config;
config();

const sendEmail = async (mailOptions) =>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    const options = {
        from: 'Mustafa <mustafa@ECommerce.io>',
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text
    };


    await transporter.sendMail(options);
}



export default sendEmail;