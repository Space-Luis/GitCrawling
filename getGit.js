const request = require('request');
const cheerio = require('cheerio')
const url = "https://github.com/9992"

request(url, (error,respon,body)=>{
    if (error) throw error;
    let $ = cheerio.load('g')
    console.log($);
});