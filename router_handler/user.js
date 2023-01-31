/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
const config = require("../config")
// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userInfo = req.body
    const sqlStr = "select * from user where username=?"
    db.query(sqlStr, userInfo.username, (err, result) => {
        if (err) { return res.cc(err) }
        if (result.length > 0) {
            return res.cc("该用户已存在")
        }
        //对密码进行bcrypt加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql = "insert into user set ?"
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

// 登录的处理函数
exports.login = (req, res) => {
    const userInfo = req.body
    const sqlStr = "select * from user where username=?"
    db.query(sqlStr,userInfo.username,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc("用户名错误，请重试")
        const compareResult = bcrypt.compareSync(userInfo.password,result[0].password)
        if(!compareResult) return res.cc("密码错误，登陆失败")
        const tokenStr ="Bearer "+jwt.sign({username:userInfo.username},config.secretKey,{expiresIn:"3h"})
        res.send({
            code:200,
            msg:"登陆成功",
            token:tokenStr
        })
    })
}
exports.role=(req,res)=>{
    const userInfo=req.body
    console.log(userInfo);
    const sqlStr = "select * from user_role where name=?"
    db.query(sqlStr,userInfo.name,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc("查询失败")
        result[0].role = result[0].role.split(",")
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
    })
}
exports.getRole=(req,res)=>{
    const sqlStr = "select * from user_role"
    db.query(sqlStr,(err,result)=>{
        if(err) return res.cc(err)
        result.forEach(item=>{
            item.role=item.role.split(",")
        })
        console.log(result);
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
    })
}
exports.updateRole=(req,res)=>{
    const sqlStr = 'update user_role set role=?,permission=? where name=?'
    db.query(sqlStr,[req.body.role,req.body.permission,req.body.name],(err,result)=>{
        if(err) res.cc(err)
        if(result.affectedRows!==1) return res.cc("修改失败")
        res.cc("修改成功",200) 
    })
}
exports.getRoleByName=(req,res)=>{
    const sqlStr = "select * from user_role where name=?"
    db.query(sqlStr,req.body.name,(err,result)=>{
        if(err) res.cc(err)
        if(result.length!==1) return res.cc("查询失败")
        result[0].role = result[0].role.split(",")
        result[0].permission =  result[0].permission.split(",")
        res.send({
            code:200,
            msg:"查询成功",
            data:result
        })
    })
}
exports.setUser=(req,res)=>{
    const sqlStr = "INSERT INTO `vue3_user_info`(`name`,`roles`,`time`) VALUES (?,?,?)"
    const {name,roles,time} = req.body
    db.query(sqlStr,[name,roles,time],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            res.cc("注册成功", 200)
        } else {
            res.cc("注册失败")
        };
    })
}
exports.getUserList=(req,res)=>{
    const sqlStr = "SELECT `name` FROM `vue3_user_info` WHERE 1"
    db.query(sqlStr,(err,result)=>{
        if(err) res.cc(err)
        let temp = []
        result.forEach((item)=>{
            temp.push(item.name)
        })
        res.send({
            code:200,
            msg:"查询成功",
            data:temp
        })
    })
}
////修改系统用户密码
exports.updateUserPW=(req,res)=>{
    let {username,password} = req.body
    password = bcrypt.hashSync(password, 10)
    const sqlStr = "UPDATE `user` SET `password`=? WHERE username=?"
    db.query(sqlStr,[password,username],(err,result)=>{
        if (err) return res.cc(err)
        if (result.affectedRows === 1) res.send({
            code: 200,
            msg: "更新成功"
        })
    })
}
exports.deleteUser=(req,res)=>{
    let {username} = req.body
    const sqlStr = "DELETE FROM `user` WHERE username=?"
    const sqlStr2 = "DELETE FROM `vue3_user_info` WHERE name=?"
    db.query(sqlStr,username,(err,result)=>{
        if(err) res.cc(err)
    })
    db.query(sqlStr2,username,(err,result2)=>{
        if(err) res.cc(err)
        if (result2.affectedRows === 1) res.send({
            code: 200,
            msg: "删除成功"
        })
    })
}
