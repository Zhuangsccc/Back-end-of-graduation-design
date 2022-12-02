const mysql = require ("mysql")
const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"zsc15375877980",
    database:"vue_admin"
})
module.exports=db