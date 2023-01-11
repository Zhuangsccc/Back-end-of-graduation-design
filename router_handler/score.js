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
exports.addNewScore=(req,res)=>{
    const {name,subject,score,type} = req.body
    const sqlStr = "INSERT INTO `examinations`( `name`, `subject`, `score`, `type`) VALUES (?,?,?,?)"
    db.query(sqlStr,[name,subject,score,type],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("新增成功", 200)
        } else {
            res.cc("新增失败")
        };
    })
}
exports.updateScore=(req,res)=>{
    const {id,name,subject,score,type} = req.body
    const sqlStr = "UPDATE `examinations` SET `name`=?,`subject`=?,`score`=?,`type`=? WHERE id=?"
    db.query(sqlStr,[name,subject,score,type,id],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("更新成功", 200)
        } else {
            res.cc("更新失败")
        };
    })
}