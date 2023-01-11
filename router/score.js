const express = require("express")
const router = express.Router()
const score_handler =require("../router_handler/score.js")
router.get("/getScore",score_handler.getScore)
router.post("/getScoreByName",score_handler.getScoreByName)
module.exports = router