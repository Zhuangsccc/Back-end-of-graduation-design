const express = require("express")
//创建路由示例
const router = express.Router()
//引入路由处理函数
const stuUserHandler= require("../router_handler/stu_admin_user.js")

router.post("/regUser",stuUserHandler.regUser)
router.post("/login",stuUserHandler.login)
router.get("/getStuInfo",stuUserHandler.getStuInfo)
router.post("/updatePersonInfo",stuUserHandler.updatePersonInfo)
router.post("/getMessageBoard",stuUserHandler.getMessageBoard)
module.exports = router