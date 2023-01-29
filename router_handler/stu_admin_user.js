const db = require("../db")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
const config = require("../config")
exports.regUser=(req,res)=>{
    const userInfo = req.body
    const sqlStr = "select * from stu_admin_user where username=?"
    db.query(sqlStr, userInfo.username, (err, result) => {
        if (err) { return res.cc(err) }
        if (result.length > 0) {
            return res.cc("该用户已存在")
        }
        //对密码进行bcrypt加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql = "insert into stu_admin_user set ?"
        db.query(sql, userInfo, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows === 1) {
                res.cc("注册成功", 200)
            } else {
                res.cc("注册失败")
            };
        })
    })
}
exports.login = (req, res) => {
    const userInfo = req.body
    const sqlStr = "select * from stu_admin_user where username=?"
    db.query(sqlStr,userInfo.username,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc("用户名错误，请重试")
        const compareResult = bcrypt.compareSync(userInfo.password,result[0].password)
        if(!compareResult) return res.cc("密码错误，登陆失败")
        const tokenStr ="Bearer "+jwt.sign({username:userInfo.username},config.secretKey,{expiresIn:"3h"})
        res.send({
            code:200,
            msg:"登陆成功",
            token:tokenStr,
            stuName:result[0].stu
        })
    })
}
exports.getStuInfo=(req,res)=>{
    const {stu} = req.query
    const sqlStr = "SELECT * FROM `stu_user` WHERE name= ?"
    db.query(sqlStr,stu,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc("用户名错误，请重试")
        res.send({
            code:200,
            msg:"查询成功",
            data:result[0]
        })
    })
}
exports.updatePersonInfo=(req,res)=>{
    const data = req.body
    const sqlStr = "UPDATE `stu_user` SET ? WHERE id=?"
    db.query(sqlStr,[data,data.id],(err,result)=>{
        if(err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("更新成功", 200)
        } else {
            res.cc("更新失败")
        };
    })
}