const express = require("express")
const router = express.Router()
const finance_handler =require("../router_handler/finance.js")
router.get("/getList",finance_handler.getList)
module.exports = router