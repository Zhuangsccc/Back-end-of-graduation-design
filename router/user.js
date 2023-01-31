const express = require("express")
//创建路由示例
const router = express.Router()
    const userController = require('../controllers/UserController')
//引入路由处理函数
const userHandler= require("../router_handler/user.js")
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
router.post("/regUser",expressJoi(reg_login_schema),userHandler.regUser)
router.post("/login",expressJoi(reg_login_schema),userHandler.login)
router.post("/role",userHandler.role)
router.get("/role",userHandler.getRole)
router.post("/updateRole",userHandler.updateRole)
router.post("/getRoleByName",userHandler.getRoleByName)
router.post("/setUser",userHandler.setUser)
router.get("/getUserList",userHandler.getUserList)
router.get("/get",(req,res)=>{
    res.send({
        code:200,
        msg:"成功请求",
        data:{}
    })
})
//上传头像
router.post('/upload/avatar', userController.upload)
//修改系统用户密码
router.post("/updateUserPW",userHandler.updateUserPW)
//删除系统用户
router.delete("/deleteUser",userHandler.deleteUser)
//暴露路由对象
module.exports = router