const db = require("../db")

exports.getScore=(req,res)=>{
    let {pageIndex,pageSize} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from examinations"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT `id`, `name`, `subject`, `score`, `type` FROM `examinations` WHERE 1 order by subject,score desc limit ?,?"
    db.query(sqlStr,[pageIndex,pageSize],(err,result)=>{
        if(err) res.cc(err)
        if(total){
            res.send({
                code:200,
                msg:"查询成功",
                data:{
                    tableData:result,
                    total,
                }
            })
        }
    })
}
exports.getScoreByName=(req,res)=>{
    const getTotal = "select count(id) as tt from examinations WHERE name=?"
    let {name,pageIndex,pageSize} = req.body
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    db.query(getTotal,name,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT `id`, `name`, `subject`, `score`, `type` FROM `examinations` WHERE name=? order by score desc limit ?,? "
    db.query(sqlStr,[name,pageIndex,pageSize],(err,result)=>{
        if(err) res.cc(err)
        if(total){
            res.send({
                code:200,
                msg:"查询成功",
                data:{
                    tableData:result,
                    total,
                }
            })
        }
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
exports.deleteScore=(req,res)=>{
    const {id} = req.body
    const sqlStr = "DELETE FROM `examinations` WHERE id=?"
    db.query(sqlStr,id,(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("删除成功", 200)
        } else {
            res.cc("删除失败")
        };
    })
}