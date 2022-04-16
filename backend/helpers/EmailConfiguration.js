let nodemailer=require('nodemailer');


 var transporter= nodemailer.createTransport({
    service:'gmail',
    secure: false,
    port: 25,
    tls: {
      rejectUnauthorized: false
     },
    auth:{
      user:'beldi.ensas@gmail.com',
      pass:'MINIprojet2022 '
    }
  }); 

  module.exports =transporter