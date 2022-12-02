//文章管理路由
const express = require("express")
const router = express.Router()
const article_handler =require("../router_handler/article")
router.post("/add",article_handler.add_article)
module.exports=router