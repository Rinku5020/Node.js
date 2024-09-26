const nodemailer = require("nodemailer");
const dotenv=require('dotenv') 
dotenv.config()
const SendMail=async(email,htmlTemplate)=>{
    const transporter = nodemailer.createTransport({
        service:process.env.SERVICES,
        auth: {
          user: process.env.HOSTEMAIL,
          pass: process.env.HOSTPASSWORD ,
        },
      })
    
      try {
        const info = await transporter.sendMail({
            from: process.env.HOSTEMAIL, // sender address
            to: email, // list of receivers
            subject: "verification otp", // Subject line
            html:htmlTemplate
          });

          console.log("message sent: %")

      } catch (error) {
        console.log(error)
      }
}
module.exports=SendMail