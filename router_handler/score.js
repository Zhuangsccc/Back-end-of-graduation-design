const db = require("../db")

exports.getScore=(req,res)=>{
    const sqlStr = "SELECT `id`, `name`, `subject`, `score`, `type` FROM `examinations` WHERE 1 order by subject,score desc"
    db.query(sqlStr,(err,result)=>{
        if(err) res.cc(err)
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
    })
}
exports.getScoreByName=(req,res)=>{
    const {name} = req.body
    const sqlStr = "SELECT `id`, `name`, `subject`, `score`, `type` FROM `examinations` WHERE name=? order by score desc "
    db.query(sqlStr,name,(err,result)=>{
        if(err) res.cc(err)
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
    })
}