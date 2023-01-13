const express = require("express")
const router = express.Router()
const finance_handler =require("../router_handler/finance.js")
router.get("/getList",finance_handler.getList)
router.get("/getApprovalList",finance_handler.getApprovalList)
router.post("/addFinance",finance_handler.addFinance)
module.exports = router