var user_model = require('../model/usermodel')
var nodemailer = require('nodemailer');
const storage = require('node-persist')



exports.register = async (req,res) => {


     var data = await user_model.create(req.body)

     var send_mail = data.email;

     var OTP = Math.floor(100000 + Math.random() * 900000)

     await storage.init( /* options ... */ );
     await storage.setItem('OTP',OTP)

     if(data){

          var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                 user: 'sonanijaydip4@gmail.com',
                 pass: 'nlyrowplpfzwkwqj'
               }
             });
             
             var mailOptions = {
               from: 'sonanijaydip4@gmail.com',
               to: send_mail,
               subject: 'Sending Email using Node.js',
               text: 'your otp is '+OTP
             };
             
             transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                 console.log(error);
               } else {
                 console.log('Email sent: ' + info.response);
               }
             });
             
     }

     res.status(200).json({
          status: 'success',
          data
     })

}

exports.check_otp = async (req,res) => {

     await storage.init()
     var old_otp = await storage.getItem('OTP')
     var new_otp = req.body.otp;

     if(old_otp == new_otp){
          res.status(200).json({
               status: 'Account Verify'
               
          })
     }
     else{
          res.status(200).json({
               status: 'check your otp'
          })
     }
}