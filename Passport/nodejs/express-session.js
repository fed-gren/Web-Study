//below code is express-session example -> http://expressjs.com/en/resources/middleware/session.html

var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var file_store = require('session-file-store')(session);

var app = express()

app.use(session({
    secret: 'keyboard cat',     //필수 옵션. 소스코드로 공개되게 업로드하면 안됨.(외부 처리)
    resave: false,              //세션 값이 바뀌기 전까지 다시저장 안한다는 의미
    saveUninitialized: true,    //세션이 필요하기 전까진 세션 구동시키지 않음(true)
    store: new file_store()     //세션id에 맞는 파일을 읽어와서 객체 추가할 수 있게 만든다.
}))


app.get('/', (req, res, next) => {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`);
})

app.listen(3000, () => {
    console.log("port 3000!");
});