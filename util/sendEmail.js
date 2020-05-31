const nodemailer = require('nodemailer');
const fs = require('fs');
var mail = {}

mail.address = (from, to, subject, msg, token) => {

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.ADMIN_EMAIL, // generated ethereal user
          pass: process.env.ADMIN_EMAIL_PASSWORD // generated ethereal password
      }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: msg,
    html: msg // html body
      // template: 'index'
  }).then(data=>{
      console.log("============ send ==============");
      console.log(data);
  }).catch(console.error, function(){
    console.log("================= not send ============");
  });
}

main().then(function(){
  console.log("=========================---send---=========================");
})

  return {
      from: from,
      to: to,
      subject: subject,
      msg: msg,
  };

}

module.exports = mail;