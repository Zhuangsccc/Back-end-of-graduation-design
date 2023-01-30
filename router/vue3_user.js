const express = require("express")
//创建路由示例
const router = express.Router()
//引入路由处理函数
const userHandler= require("../router_handler/vue3_user.js")
router.post("/userInfo",userHandler.userInfo)
router.get("/getRoutes",userHandler.getRoutes)
router.post("/addRoutes",userHandler.addRoutes)
router.post("/updateRoute",userHandler.updateRoute)
router.delete("/deleteRoute",userHandler.deleteRoute)
router.get("/getStuInfo",userHandler.getStuInfo)
router.post("/addStuInfo",userHandler.addStuInfo)
router.post("/updateStuInfo",userHandler.updateStuInfo)
router.delete("/deleteStuInfo",userHandler.deleteStuInfo)
router.post("/setIdRoute",userHandler.setIdRoute)
router.post("/updateRoles",userHandler.updateRoles)
router.post("/getMessageBoard",userHandler.getMessageBoard)
router.delete("/deleteMessageBoard",userHandler.deleteMessageBoard)
router.post("/updateMessageBoard",userHandler.updateMessageBoard)
//暴露路由对象
module.exports = router