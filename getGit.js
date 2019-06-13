const url = require('url')
const client = require('cheerio-httpcli')   
const user_url = "https://github.com/9992"
const log = console.log

// url 에 유저 닉네임이 없을 경우 입력을 요청하는 함수
function checkUrl(userUrl)
{
    parseUrl =  url.parse(userUrl,true)
    if(parseUrl['path'] == '/'){ 
        log("유저 닉 추가 되는 부분")
        nickName = "9992"
        addparseUrl = addUserId(parseUrl['hostname'],nickName)
    } else {
        log(parseUrl['path'])
    }
}


// 요청에 대한 응답이 돌아왔을때 유저 닉네임을 링크로 추가 시키는 함수
function addUserId(userUrl,userName)
{
    addUrl = userUrl + '/' + userName
    return addUrl
}

// 실질적으로 크롤링 하는 부분
function gitCrawling()
{
    const crawlData = {
        todayData : "",
        yearData : ""
    }
    Date.prototype.yyyymmdd = function(){
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        log(yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]))
        return yyyy +'-'+ (mm[1] ? mm + '-' : '0'+mm[0] + '-') + (dd[1] ? dd : '0'+dd[0]);
    }
    const today = (new Date()).yyyymmdd()
    // yyyy-mm-dd 형태로 오늘을 저장

    client.fetch(user_url, function(err, $, res) {
        if(err) {
            log(err)
            return
        }
        crawlData.todayData = parseInt($(`[data-date=${today}]`)[0]['attribs']['data-count'])
        crawlData.yearData = parseInt($('div.js-yearly-contributions').children('div.position-relative').children('h2').text())
        log("Today Commit : ",crawlData.todayData)
        log("Year Commit : ",crawlData.yearData)
    });

    log('크롤링 진행중 입니다.....(인터넷 속도가 느리면 실패할 수도 있습니다.)')
    return crawlData
}



// git 함수 실행
let data = gitCrawling()
checkUrl("https://github.com/9992")
checkUrl("https://github.com/")