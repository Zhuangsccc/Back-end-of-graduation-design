const db = require("../db/index")
exports.getList=(req,res)=>{
    let {pageIndex,pageSize} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from finance"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT * FROM `finance` WHERE 1 order by time desc limit ?,?"
    db.query(sqlStr,[pageIndex,pageSize],(err,result)=>{
        if(err) res.cc(err)
        res.send({
            code:200,
            msg:"查询成功",
            data:{
                tableData:result,
                total,
            }
        })
    })
}