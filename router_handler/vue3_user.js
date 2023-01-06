//导入数据库操作模块
const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
const config = require("../config")
const { func } = require("joi")
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
        res.send({
            code:200,
            msg:"ok",
            data:temp
        })
    })
}
exports.getStuInfo=(req,res)=>{
    const sqlStr = "SELECT * FROM `stu_user` WHERE 1"
    db.query(sqlStr,(err,result)=>{
        if(err) res.cc(err)
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
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