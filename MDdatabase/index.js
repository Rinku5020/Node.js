const express=require("express")
const app=express()

app.use("/weather",(req,res)=>
{
    console.log("weather")
})

app.listen(8080,()=>
{
    console.log("server is live")
})