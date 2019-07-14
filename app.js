var express = require('express');
var getData = require('./getGit')
var app = express();

app.get('/',(req,res)=>{
    console.log(getData("9992"))
})

app.listen(3000, () =>{
    console.log("Express server stated on port 3000")
})
