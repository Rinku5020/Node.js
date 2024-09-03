const mongoose=require("mongoose")

const connection=await  mongoose.connect("mongodb://127.0.0.1:27017/Crud")
try {
    console.log("connected to DB")
} catch (error) {
    console.log(error)
}


const userSchema= new mongoose.Schema({
    Username:String,
    Email :String,
    DOB:Date,
    Role:String,
    Location:String,
    Password:String,
    CPassword:String

}) 