const mongoose=require("mongoose")

const imageSchema = new mongoose.Schema({
    imagefilename:String,
    uploadAt:{
        type:Date,
        default:Date.now
    }

})

const imageModel= mongoose.model("userUpload",imageSchema)




const connection = mongoose.connect("mongodb://127.0.0.1:27017/Avtar")


module.exports={connection,imageModel}