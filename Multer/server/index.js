const express=require("express")
const  {connection,imageModel}  = require("./db")
const cors = require("cors");
const upload = require("./util/multer");

const app=express()
app.use(cors());
app.use(express.static("./uploads"))

app.post("/upload",upload.single("file"), async(req,res)=>{
    
    //  console.log(req.file)
    //  res.send("ok") for file name and path
    const {filename}=req.file
    try {
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }
        await imageModel.create({imagefilename:filename})
        res.status(200).json({message:"image uploaded succesfully"})

    } catch (error) {
        res.status(400).json({ error: "Failed to upload file" });
    }
} )

app.get("/getImageData", async (req,res) => {
try {
    const imagedata = await imageModel.find();
    if(!imagedata){
        return res.status(400).json({message:"image not found"})
    }

    res.status(200).json(imagedata)
} 
catch (error) {
    return res.status(400).json({message:error})
    
}
})





app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected To DB")
        console.log("server run on port 8080")
    } catch (error) {
        console.log(error)        
    }
})