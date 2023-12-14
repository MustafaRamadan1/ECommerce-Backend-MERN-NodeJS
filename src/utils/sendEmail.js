// // import nodemailer from 'nodemailer';
// // import {config} from 'dotenv';

// const nodemailer = require('nodemailer');
// const config = require('dotenv').config;
// config();

// const sendEmail = async (mailOptions) =>{

//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: false,
//         auth:{
//             user: process.env.EMAIL_USERNAME,
//             pass:process.env.EMAIL_PASSWORD
//         }
//     });

//     const options = {
//         from: 'Mustafa <mustafa@ECommerce.io>',
//         to: mailOptions.to,
//         subject: mailOptions.subject,
//         text: mailOptions.text
//     };


//     await transporter.sendMail(options);
// }



// export default sendEmail;


import nodemailer from 'nodemailer';
import pug from 'pug';
class Email{
    constructor(user, url){
        this.firstName = user.name.split(' ')[0];
        this.email = user.email;
        this.url = url;
        this.from = `${process.env.EMAIL_FROM}`;
    }

    newTransporter(){
        if(process.env.NODE_ENV === 'Production'){
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth:{
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth:{
                user: process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
        }})
    }


    async send(template, subject){

        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`,{
            firstName: this.firstName,
            subject,
            url: this.url,
        });

        const mailOptions = {
            from : this.from,
            to: this.email,
            subject,
            html
        };

        await this.newTransporter().sendMail(mailOptions);
    }


    async sendActivate(){

        await this.send('activateUser', 'Activate your Email in our Website');
        console.log(`the Email sent`);
    }
};

export default Email;