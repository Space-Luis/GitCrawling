const url = require('url')
const client = require('cheerio-httpcli')   
const user_url = "https://github.com/9992";
const mysql = require('mysql');
const db_info = require('./dbInfo');
// user_url은 추후에 입력받게 할 예정 
// 테스트는 링크로 진행하였지만 실제는 계정만 검색 가능할 수 있도록 할 예정입니다.
const log = console.log

// url 에 유저 닉네임이 없을 경우 입력을 요청하는 함수
function checkUrl(userUrl)
{
    const con = mysql.createConnection(
        db_info.connectInfo
    );
    con.connect()
    parseUrl =  url.parse(userUrl,true)
    if(parseUrl['path'] == '/'){ 
        nickName = "9992"; //여기에서 입력 시킬 수 있도록 시켜야한다.
        addparseUrl = addUserId(parseUrl['hostname'],nickName);
        con.query("select ID from git_user WHERE ID = "+nickName, (err,data)=> {
            console.log(data)
        });
        // SELECT 한 ID 행에서 nickName이 들어있는지 확인하여 확인할 수 있도록
    } else {
        nickName = parseUrl['path'];
        
    }
    con.end()
}

// con.query("INSERT INTO git_user(ID) VALUES("+nickName+")", (err)=>{
//     if(err){
//         log("존재하는 닉네임입니다.");
//     } else {
//         log(nickName)
//     }
// });

// 요청에 대한 응답이 돌아왔을때 유저 닉네임을 링크로 추가 시키는 함수
function addUserId(userUrl,userName)
{
    addUrl = userUrl + '/' + userName
    return addUrl
}

// 실질적으로 크롤링 하는 부분
function gitCrawling()
{
    const con = mysql.createConnection(
        db_info.connectInfo
    );
    con.connect()
    const crawlData = {
        todayData : "",
        yearData : ""
    }
    
    Date.prototype.yyyymmdd = function(){
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        log(yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]));
        return yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]);
    }
    const today = (new Date()).yyyymmdd()
    // yyyy-mm-dd 형태로 오늘을 저장
    
    // 입력한 url 을 통해 접속하여 데이터를 스크래핑해옴
    client.fetch(user_url, function(err, $, res) {
        if(err) {
            log(err)
            return
        }
        // parseInt를 통해 int 형의 자료형의 데이터만 가져온다.
        crawlData.todayData = parseInt($(`[data-date=${today}]`)[0]['attribs']['data-count'])
        crawlData.yearData = parseInt($('div.js-yearly-contributions').children('div.position-relative').children('h2').text())
        log("Today Commit : ",crawlData.todayData)
        log("Year Commit : ",crawlData.yearData)
        //con.query("INSERT INTO crawl_data(today_commit,total_commit) VALUES("+crawlData.todayData + "," + crawlData.yearData + ")");
    });
    
    log('크롤링 진행중 입니다.....(인터넷 속도가 느리면 실패할 수도 있습니다.)')
    con.end()

    return crawlData
}

// git 함수 실행
let data = gitCrawling()
checkUrl("https://github.com/9992")
checkUrl("https://github.com/")
