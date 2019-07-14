var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require()

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('getGit')
})