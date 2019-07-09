const mysql = require('mysql')
const db_info = require('./dbInfo')

const con = mysql.createConnection(
    db_info.connectInfo
);

con.connect()
con.query('select * from crawl_data', (err,data)=>{
    if(err){
        console.err(err);
    } else {
        console.log(data);
    }
});

con.query('select * from user', (err,data) =>{
    if(err){
        console.err(err);
    } else {
        input = "dakka";
        var sql = "'SELECT * FROM post WHERE userId = "+insertedId+"'"
        console.log(data);
    }
});

con.end();