const express = require("express")
const UserModel = require("../model/userModel")
const UserRouter = express.Router() //for use all Routing  xpress Router
const { userRegisterController, verificationController, loginController } = require("../controller/user.controller");
UserRouter.post("/register",userRegisterController)
UserRouter.post("/verification",verificationController)
UserRouter.post("/login",loginController)




module.exports = UserRouter