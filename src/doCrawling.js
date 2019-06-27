const url = require('url')
const client = require('cheerio-httpcli')   
//const user_url = "https://github.com/9992";
const mysql = require('mysql');
const db_info = require('./dbInfo');
// user_url은 추후에 입력받게 할 예정 
// 테스트는 링크로 진행하였지만 실제는 계정만 검색 가능할 수 있도록 할 예정입니다.
const log = console.log

const con = mysql.createConnection(
    db_info.connectInfo
);
// url 에 유저 닉네임이 없을 경우 입력을 요청하는 함수

function doList() 
{
    checkUrl("https://www.github.com");
}

function checkUrl(userName)
{
    if(userName == '/'){ 
        nickName = "9992"; //여기에 난중에 다양한 이름이 들어올 수 있는 함수로 대체 
        // console.log(parseUrl) , 패싱된 데이터 형태를 알기 위해 출력
        con.query("select ID from git_user WHERE ID = "+nickName, (err,data)=> {
            // 쿼리 값 조회 
            if (data[0]==null){
                // 검색 값이 비어있으면 등록되지 않은 nickName이다.
                con.query("INSERT INTO git_user(ID) VALUES("+nickName+")")
                //중복값 확인 후 삽입 쿼리 
            } else {
                console.log("기존에 등록되어 있는 닉네임입니다.")
            }
        });
    } else {
        nickName = parseUrl['path'];
        addparseUrl = addUserId(parseUrl['href'],nickName);
        // 검사때문에 nickName만 따로 뺐는데, 추가적으로 변수를 사용하면 안될까?
        // parseUrl을 쓰는게 나을까
        con.query("select ID from git_user WHERE ID = "+nickName, (err,data)=> {
            // 쿼리 값 조회 함수
            if (data[0]==null){
                con.query("INSERT INTO git_user(ID) VALUES("+nickName+")") 
                //중복 값 확인 후 삽입 쿼리
            } else {
                console.log("기존에 등록되어 있는 닉네임입니다.")
            }
        });
    }
    return addparseUrl = addUserId(parseUrl['href'],nickName);
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
async function gitCrawling(con,userUrl)
{
    const crawlData = {
        todayData : "",
        yearData : ""
    }
    con.connect()
    checkUrlData = checkUrl(url.parse(userUrl)[ 'herf'])
    userName = url.parse(userUrl)['path']
    
    console.log("크롤:",userName)
    Date.prototype.yyyymmdd = function(){
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        log(yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]));
        return yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]);
    }
    const today = (new Date()).yyyymmdd()
    // yyyy-mm-dd 형태로 오늘을 저장
    
    userUrl = checkUrl(userName)

    // 입력한 url 을 통해 접속하여 데이터를 스크래핑해옴
    client.fetch(userUrl, await function(err, $, res) {
        if(err) {
            log(err)
            return
        }
        // parseInt를 통해 int 형의 자료형의 데이터만 가져온다.
        crawlData.todayData = parseInt($(`[data-date=${today}]`)[0]['attribs']['data-count'])
        crawlData.yearData = parseInt($('div.js-yearly-contributions').children('div.position-relative').children('h2').text())
        log("Today Commit : ",crawlData.todayData)
        log("Year Commit : ",crawlData.yearData)
        //con.quert("SELECT INDEX FROM git_user WHERE = "+)
        //con.query("INSERT INTO crawl_data(today_commit,total_commit) VALUES("+crawlData.todayData + "," + crawlData.yearData + ")");
    });
    

    log('크롤링 진행중 입니다.....(인터넷 속도가 느리면 실패할 수도 있습니다.)')
    return crawlData
}

// git 함수 실행
doList()
// 비동기 식으로 변경해야겠다.
