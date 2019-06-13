const url = require('url')
const client = require('cheerio-httpcli')   
const user_url = "https://github.com/9992"
const log = console.log
test = url.parse(user_url,true)
log("test결과 : ",test)
function checkUrl(userUrl)
{
    parseUrl =  url.parse(userUrl,true)
    if(parseUrl['path'] == null){
        log("사용자 이름을 입력 해야함 ")
    } else {
        log(parseUrl['path'])
    }
}

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
        crawlData.todayData = ($(`[data-date=${today}]`)[0]['attribs']['data-count'])
        crawlData.yearData = ($('div.js-yearly-contributions').children('div.position-relative').children('h2').text())
        log("Today Commit : ",crawlData.todayData)
        log("Year Commit : ",crawlData.yearData)
    });

    log('크롤링 진행중 입니다.....(인터넷 속도가 느리면 실패할 수도 있습니다.)')
    return crawlData
}




let data = gitCrawling()
checkUrl("https://github.com/9992")
checkUrl("https://github.com/")