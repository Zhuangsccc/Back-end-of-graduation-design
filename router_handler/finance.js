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
exports.getApprovalList=(req,res)=>{
    let {pageIndex,pageSize} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from finance where state=0"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT * FROM `finance` WHERE state=0 order by time desc  limit ?,?"
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
exports.addFinance=(req,res)=>{
    const {price,time,title,submitter,type,state,approver} = req.body
    const sqlStr = "INSERT INTO `finance`(`price`, `time`, `title`, `submitter`, `type`, `state`, `approver`) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlStr,[price,time,title,submitter,type,state,approver],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("新增成功", 200)
        } else {
            res.cc("新增失败")
        };
    })
}
exports.updateFinance=(req,res)=>{
    const {state,approver,id} = req.body
    const sqlStr = "UPDATE `finance` SET `state`=?,`approver`=? WHERE id=?"
    db.query(sqlStr,[state,approver,id],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("修改成功", 200)
        } else {
            res.cc("修改失败")
        };
    })
}