//导入数据库操作模块
const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
const config = require("../config")
exports.userInfo=(req,res)=>{
    const userInfo = req.body
    const sqlStr = "select * from vue3_user_info where name=?"
    db.query(sqlStr, [userInfo.username], (err, result) => {
        if (err) return res.cc(err)
        if (result.length != 1) return res.cc("查询失败")
        result[0].roles=result[0].roles.split(",")
        result[0].perms=result[0].perms.split(",")
        res.send({
            code: 200,
            msg: "获取成功",
            data: result[0]
        })
    })
}
function setId(routes){
    routes.forEach(item => {
        if(item.children){
            item.children.forEach(prop=>{
                prop.Ppath = item.path
                if(prop.children){
                    setId(item.children)
                }
            })
        }
    });
}
function setTitle(routes){
    routes.forEach(item=>{
        item.title = item.meta.title
        if(item.children){
            setTitle(item.children)
        }
    })
}
exports.getRoutes= (req,res)=>{
    const sqlStr = "SELECT * FROM `routes`"
    db.query(sqlStr,(err,result)=>{
        if(err) res.cc(err)
        let temp = []
        for(let i = 0;i<result.length;i++){
            result[i].route = JSON.parse(result[i].route)
            result[i].route.id = result[i].id
            temp.push(result[i].route)
        }
        setId(temp)
        setTitle(temp)
        res.send({
            code:200,
            msg:"ok",
            data:temp
        })
    })
}
exports.getStuInfo=(req,res)=>{
    let {pageIndex,pageSize} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from stu_user"
    const sqlStr = "SELECT * FROM `stu_user` WHERE 1 order by major,class asc limit ?,?"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
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
                msg:"服务器繁忙,请刷新重试",
            })
        }
    })
}
exports.addStuInfo=(req,res)=>{
   const form = req.body
   const sqlStr = "INSERT INTO `stu_user`( `name`, `phone`, `age`, `major`, `email`, `assistant`, `class`, `gender`) VALUES (?,?,?,?,?,?,?,?)"
   db.query(sqlStr,[form.name,form.phone,form.age,form.major,form.email,form.assistant,form.class,form.gender],(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("添加成功", 200)
        } else {
            res.cc("添加失败")
        };
   })
} 
exports.updateStuInfo=(req,res)=>{
    const form = req.body
    const sqlStr = "UPDATE `stu_user` SET `name`=?,`phone`=?,`age`=?,`major`=?,`email`=?,`assistant`=?,`class`=?,`gender`=? WHERE id=?"
    db.query(sqlStr,[form.name,form.phone,form.age,form.major,form.email,form.assistant,form.class,form.gender,form.id],(err,result)=>{
        if(err) res.cc(err)
        if(result.affectedRows===1){
            res.cc("更新成功",200)
        } else {
            res.cc("更新失败")
        }
    })
}
exports.deleteStuInfo=(req,res)=>{
    const {id} =req.body
    const sqlStr = "DELETE FROM `stu_user` WHERE id=?"
    db.query(sqlStr,id,(err,result)=>{
        if(err) res.cc(err)
        if(result.affectedRows===1){
            res.cc("删除成功",200)
        } else {
            res.cc("删除失败")
        }
    })
}
exports.addRoutes=(req,res)=>{
    const {route} = req.body
    const sqlStr = "INSERT INTO `routes`(`route`) VALUES (?)"
    db.query(sqlStr,route,(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("添加成功", 200)
        } else {
            res.cc("添加失败")
        }
    })
}
exports.updateRoute=(req,res)=>{
    const {route,id} = req.body
    const sqlStr = "UPDATE `routes` SET `route`=? WHERE id=?"
    db.query(sqlStr,[route,id],(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("添加成功", 200)
        } else {
            res.cc("添加失败")
        }
    })
}
exports.deleteRoute=(req,res)=>{
    const {id} = req.body
    const sqlStr = "DELETE FROM `routes` WHERE id=?"
    db.query(sqlStr,id,(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("删除成功", 200)
        } else {
            res.cc("删除失败")
        }
    })
}
exports.setIdRoute=(req,res)=>{
    const {route,id} = req.body
    const sqlStr = "INSERT INTO `routes`(`route`, `id`) VALUES (?,?)"
    db.query(sqlStr,[route,id],(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("添加成功", 200)
        } else {
            res.cc("添加失败")
        }
    })
}
exports.updateRoles=(req,res)=>{
    const {roles,name} = req.body
    const sqlStr = "UPDATE `vue3_user_info` SET `roles`=? WHERE name=?"
    db.query(sqlStr,[roles,name],(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("添加成功", 200)
        } else {
            res.cc("添加失败")
        }
    })
}
exports.getMessageBoard=(req,res)=>{
    let {pageIndex,pageSize} = req.body
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    let total = 0
    const getTotal = "select count(id) as tt from message_board where 1"
    db.query(getTotal,(err,newTotal)=>{
        if(err) res.cc(err)
        total = newTotal[0].tt
    })
    const sqlStr = "SELECT * FROM message_board WHERE 1 order by release_time desc limit ?,?"
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
                msg:"服务器繁忙,请刷新重试",
            })
        }
    })
}
exports.deleteMessageBoard=(req,res)=>{
    const {id} = req.body
    const sqlStr = "DELETE FROM `message_board` WHERE id=?"
    db.query(sqlStr,id,(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("删除成功", 200)
        } else {
            res.cc("删除失败")
        }
    })
}
exports.updateMessageBoard=(req,res)=>{
    const {id,reply_content,reply_time,is_reply} = req.body
    const sqlStr = "UPDATE `message_board` SET `reply_content`=?,`reply_time`=?,`is_reply`=? WHERE id=?"
    db.query(sqlStr,[reply_content,reply_time,is_reply,id],(err,result)=>{
        if(err) res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("回复成功", 200)
        } else {
            res.cc("回复失败")
        }
    })
}