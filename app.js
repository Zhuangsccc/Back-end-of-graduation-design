const express = require("express")
//创建服务器示例
const app = express()
//配置跨域中间件
const cors = require("cors")
const joi = require("joi")
app.use(cors())
//配置jwt
var { expressjwt: jwt } = require("express-jwt")
const config = require("./config")
//解析表单数据中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req,res,next)=>{
    res.cc=(err,code=600)=>{
        res.send({
            code,
            msg:err instanceof Error?err.message:err
        })
    }
    next()
})
app.use(jwt({ secret: config.secretKey,algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
// 导入并注册用户路由模块
const userRouter = require('./router/user')
const UserInfoRouter = require("./router/userInfo")
const artcateRouter = require("./router/artcate")
const articleRouter = require("./router/article")
const vue3UserRouter = require("./router/vue3_user")
const scoreRouter = require("./router/score")
app.use('/api', userRouter)
app.use("/vue3",vue3UserRouter)
app.use("/score",scoreRouter)
app.use("/my",UserInfoRouter)
app.use("/my/article",artcateRouter)
app.use("/my/article",articleRouter)
app.post("/admin/userInfo",(req,res)=>{
    res.send(req.auth)
})
app.use(function (err,req,res,next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！请重新登录')
    // 未知错误
    res.cc(err)
  })
app.listen(3007, () => {
    console.log("服务器运行在http://127.0.0.1:3007 "+Date());
})