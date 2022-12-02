const db = require("../db/index")
const bcrypt = require("bcryptjs")
exports.getUserInfo = (req, res) => {
    const sqlStr = "select id, username, nickname, email, user_pic from user where username=?"
    db.query(sqlStr, req.auth.username, (err, result) => {
        if (err) return res.cc(err)
        if (result.length != 1) return res.cc("查询失败")
        res.send({
            code: 200,
            msg: "获取成功",
            data: result[0]
        })
    })
}
exports.updateUserInfo = (req, res) => {
    const userInfo = req.body
    const sqlStr = "update user set ? where id=?"
    db.query(sqlStr, [userInfo, userInfo.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows === 1) res.send({
            code: 200,
            msg: "更新成功"
        });
    })
}
exports.updateUserInfoPwd = (req, res) => {
    const userInfo = req.body
    const sql = "select * from user where username=?"
    db.query(sql,req.auth.username,(err, result) => {
        if (err) return res.cc(err)
        if (result.length != 1) res.cc("更新失败请稍后再试")
        const compareResult = bcrypt.compareSync(userInfo.oldPwd, result[0].password)
        if (!compareResult) res.cc("旧密码不正确")
        const sql = "update user set password=? where username=?"
        const newPwd= bcrypt.hashSync(userInfo.newPwd,10)
        db.query(sql,[newPwd,req.auth.username],(err,result)=>{
            if(err) return res.cc(err)
            if(result.affectedRows!=1) return res.cc("更新失败，请稍后再试")
            return res.cc("更新密码成功",200)
        })
    })
}