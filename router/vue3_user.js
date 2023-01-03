const express = require("express")
//创建路由示例
const router = express.Router()
//引入路由处理函数
const userHandler= require("../router_handler/vue3_user.js")
router.get("/userInfo",userHandler.userInfo)
//暴露路由对象
router.get("/getRoutes",userHandler.getRoutes)
router.get("/getStuInfo",userHandler.getStuInfo)
router.post("/addStuInfo",userHandler.addStuInfo)
router.post("/updateStuInfo",userHandler.updateStuInfo)
router.delete("/deleteStuInfo",userHandler.deleteStuInfo)
module.exports = router