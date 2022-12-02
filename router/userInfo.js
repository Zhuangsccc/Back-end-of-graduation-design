const express = require("express")
const router  = express.Router()

const userHandler= require("../router_handler/userInfo.js")
const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema,update_userinfo_pwd} = require("../schema/user")
router.get("/userInfo",userHandler.getUserInfo)
router.post("/userInfo",expressJoi(update_userinfo_schema),userHandler.updateUserInfo)
router.post("/userInfo/updatePwd",expressJoi(update_userinfo_pwd),userHandler.updateUserInfoPwd)
module.exports=router 