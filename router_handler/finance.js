const { request } = require("express")
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
        if(total){
            res.send({
                code:200,
                msg:"查询成功",
                data:{
                    tableData:result,
                    total,
                }
            })
        }else{
            res.send({
                code:600,
                msg:"暂无数据,数据为空或服务器繁忙",
            })
        }
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
        if(total){
            res.send({
                code:200,
                msg:"查询成功",
                data:{
                    tableData:result,
                    total,
                }
            })
        }else{
            res.send({
                code:600,
                msg:"暂无数据,数据为空或服务器繁忙",
            })
        }
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
exports.deleteFinance=(req,res)=>{
    const {id} = req.body
    const sqlStr = "DELETE FROM `finance` WHERE id=?"
    db.query(sqlStr,id,(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("删除成功", 200)
        } else {
            res.cc("删除失败")
        };
    })
}
//获取财务收费
exports.getFinancialCharges=(req,res)=>{
    let {pageIndex,pageSize} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from financial_charges where 1"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT * FROM `financial_charges` WHERE 1 order by creation_time desc  limit ?,?"
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
        }else{
            res.send({
                code:600,
                msg:"暂无数据,数据为空或服务器繁忙",
            })
        }
    })
}
