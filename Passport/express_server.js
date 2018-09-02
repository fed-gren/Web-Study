const express = require('express');   //express 모듈 불러옴
const app = express();                //express 호출(express는 함수.)
const fs = require('fs');
const body_parser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
var session = require('express-session');
var file_store = require('session-file-store')(session);

app.use(helmet());

app.use(express.static('public'));    //public 이라는 경로에서 정적인 파일을 찾겠다는 의미

app.use(body_parser.urlencoded({ extended: false }));   // parse application/x-www-form-urlencoded
//main.js가 실행될 때마다(즉, 사용자가 요청할 때마다) body-parser가 실행된다.
//사용자가 보낸 post데이터를 내부적으로 분석해서 파싱해준다.

app.use(compression());
app.use(session({
  secret: 'keyboard cat',     //필수 옵션. 소스코드로 공개되게 업로드하면 안됨.(외부 처리)
  resave: false,              //세션 값이 바뀌기 전까지 다시저장 안한다는 의미
  saveUninitialized: true,    //세션이 필요하기 전까진 세션 구동시키지 않음(true)
  store: new file_store()     //세션id에 맞는 파일을 읽어와서 객체 추가할 수 있게 만든다.
}))




//미들웨어 만들어서 사용해보기 use를 쓰면 모든 요청에 대해서 처리하고, get으로 바꾸고 *를 추가해서 get방식일때만 모든 요청에 대해서 사용한다.
app.get('*', (req, res, next) => {
  fs.readdir('./data', function (error, filelist) {
    req.list = filelist;
    next();   //이 다음 미들웨어를 호출하는 것이다.(없애면 여기서 멈추나보다.)
  });
});

const index_router = require('./routes/index.js');
const topic_router = require('./routes/topic.js');
const auth_router = require('./routes/auth.js');

app.use('/', index_router);
app.use('/topic', topic_router);  // /topic으로 시작하는 주소들에게 topicRouter라는 미들웨어를 적용한다는 의미
app.use('/auth', auth_router);

/**
 * Arrow function 변환
 * function(req, res) {
 *  
 * return res.send('Hello');
 * }
 */

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {    //express에서 인자 4개인 함수는  error handling
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!!!!'));