const mongoose=require("mongoose")

const connectFun = async ()=>{
    try {  const connection = await mongoose.connect('mongodb://127.0.0.1:27017/crud')
   
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
}

connectFun();

const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    city:String,
    org:String
})

const userModel=mongoose.model("user",userSchema)