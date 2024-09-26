const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken');
const ejs = require("ejs")
const SendMail = require('../utils/sendmail');
const bcrypt=require("bcrypt")
const dotenv = require("dotenv");
const UserModel = require('../model/userModel');
dotenv.config();
const userRegisterController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const verificationToken = jwt.sign({ name, email, password,otpGenerator:otp }, process.env.PRIVATEKEY)
        console.log(otp, verificationToken)

        const htmlTemplate = await ejs.renderFile(__dirname + "/../view/email.ejs", { otp, name })
        await SendMail(email, htmlTemplate)
        res.cookie("verificationToken",verificationToken).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(400).json({ message: error?.message })
    }
}




const verificationController = (req, res) => {
const {otp}=req.body
const {verificationToken} = req.cookies
const {otpGenerator,name,email,password} = jwt.verify(verificationToken, process.env.PRIVATEKEY);
if(!otp)
{
    return res.status(400).json({ message: "Enter OTP" })
}
if(otpGenerator !== otp)
{
    return res.status(400).json({ message:"invalid OTP" })   
}


bcrypt.hash(password, 5,async function (err, hash) {
    if(err){
        return res.status(400).json({ message: "Error hashing password" })
    }else{
        await UserModel.create({name,email,password:hash})
        res.json({message:"user create succesfully"})
    }
});
}

const loginController=(req,res)=>{
    const {email,password}=req.body
    const user=UserModel.findOne({email})
    if(!user){
        return res.status(400).json({ message: "User not found"})
    }
    else
    {
        
    }
}

module.exports = { userRegisterController, verificationController,loginController }