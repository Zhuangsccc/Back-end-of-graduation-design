//文章分类管理
const express = require("express")
const router = express.Router()
const artcate_handler =require("../router_handler/artcate")
const expressJOi = require("@escook/express-joi")
const artcate_schema = require("../schema/artcate")
router.get("/cates",artcate_handler.get_artcate)
router.post("/addcates",expressJOi(artcate_schema.add_cates_schema),artcate_handler.add_artcate)
router.post("/deletecates/:id",expressJOi(artcate_schema.delete_cates_schema),artcate_handler.delete_artcate)
router.get("/cates/:id",expressJOi(artcate_schema.get_catesById_schema),artcate_handler.get_artcate_byId)
router.post("/updatecates",expressJOi(artcate_schema.update_cates_schema),artcate_handler.update_artcate_byId)
module.exports=router