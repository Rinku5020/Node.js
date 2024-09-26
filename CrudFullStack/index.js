const express=require("express") // step2
const dotenv=require('dotenv') // 2
const connection = require("./db")
const UserRouter = require("./routes/UserRoutes")
const cookieParser = require('cookie-parser')
dotenv.config()
//middleware 
const app=express()
app.use(cookieParser())
app.use(express.json())//joson to parse parse to json convertfile
app.use("/user",UserRouter) 



app.listen(process.env.PORT||3000,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(`server run on port ${process.env.PORT}`)

    } catch (error) {
        console.log(error)
    }
})

