# GitCrawling

1. Scraping : 데이터를 가져오는 행위
2. Parsing : 데이터를 추출하는 행위

# Scraping 데이터 획득
## 웹 페이지의 데이터를 가져오기 위한 라이브러리 request
```node
npm install request --save
```
## Parsing 데이터 추출
```node
npm install cheerio --save
```

# create-react-app 실행시 발생하는 문제
환경 변수의 사용자 변수 Path에 C:\\window\\System32를 추가하면 create-react-app 라이브러리를 실행할 수 없다.
설치 후에 npm start에서 Command failed with exit code ENOENT 에러였나.. 아무튼 이게 발생을 해서 해결 방안으로 사용자 변수에 추가한 것
현재 해결 진행중 19.06.14 ~ ing

# 실행 순서
크롤링
닉네임 체킹
업로드

# 찾아봐야하는 내용
- props , state 에 대한 내용
- 