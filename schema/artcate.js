
const joi = require("joi")
//定义校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
//对外暴露校验对象
exports.add_cates_schema={
    body:{
        name,
        alias
    }
}
exports.delete_cates_schema={
    params:{
        id,
    }
}
exports.get_catesById_schema={
    params:{
        id,
    }
}
exports.update_cates_schema={
    body:{
        name,
        alias,
        id
    }
}