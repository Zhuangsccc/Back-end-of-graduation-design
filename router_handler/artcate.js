const db = require("../db/index")
exports.get_artcate=(req,res)=>{
    const sql = "select * from article_cate where is_delete=0 order by id asc"
    db.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        return res.send({
            code:200,
            msg:"获取列表成功",
            data:result
        })
    })
}
exports.add_artcate=(req,res)=>{
    const sql = "select * from article_cate where name=? or alias=?"
    db.query(sql,[req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.cc(err)
        if(result.length==2) return res.cc("分类名称与别名都被占用，请重新输入")
        if (result.length==1 && result[0].name==req.body.name&&result[0].alias==req.body.alias) return  res.cc("分类名称与别名都被占用，请重新输入")
        if(result.length==1 && result[0].name==req.body.name) return res.cc("分类名称被占用，请重新输入")
        if(result.length==1 && result[0].alias==req.body.alias) return res.cc("别名被占用，请重新输入")
         const sql = "insert into article_cate set ?"
         db.query(sql,req.body,(err,result)=>{
            if(err) return res.cc(err)
            if(result.affectedRows!=1) return res.cc("添加失败，请稍后再试")
            return res.cc("添加成功",200)
         })
    })
}
exports.delete_artcate=(req,res)=>{
    const sql = "update article_cate set is_delete=1 where id=?"
    db.query(sql,req.params.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows!=1) return res.cc("删除失败")
        res.cc("删除成功",200) 
    })
}
//根据id获得列表
exports.get_artcate_byId=(req,res)=>{
    const sql ="select * from article_cate where id =?&&is_delete!=1"
    db.query(sql,req.params.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length==0) return res.cc("没有查到数据")
        if(result.length!==1) return res.cc("查询失败,请重试")
        return res.send({
            code:200,
            msg:'查询成功',
            data:result
        })
    })
}
//根据id更新数据
exports.update_artcate_byId=(req,res)=>{
    const sql="select * from article_cate where id!=? and name=? or alias=?"
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.cc(err)
        if(result.length==2) return res.cc("分类名称与别名都被占用，请重新输入")
        if (result.length==1 && result[0].name==req.body.name&&result[0].alias==req.body.alias) return  res.cc("分类名称与别名都被占用，请重新输入")
        if(result.length==1 && result[0].name==req.body.name) return res.cc("分类名称被占用，请重新输入")
        if(result.length==1 && result[0].alias==req.body.alias) return res.cc("别名被占用，请重新输入")
        const sql = "update article_cate set ? where id=?&&is_delete=0"
        db.query(sql,[req.body,req.body.id],(err,result)=>{
            if(err) return res.cc(err)
            if(result.affectedRows!==1) return res.cc("更新失败")
            return res.cc("更新成功",200)
        })
    })
}
