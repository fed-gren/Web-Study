var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const template = require('../lib/template.js');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');

let auth_data = {
    email: 'eblee@ophit.com',
    password: '1234',           //password 암호화 필요
    username: 'eb'
}

router.get('/login', (req, res) => {
    var title = 'WEB - login';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
        <form action="/auth/login_process" method="post">
          <p><input type="email" name="email" placeholder="E-mail"></p>
          <p><input type="password" name="password" placeholder="Password"></p>
          <p>
            <input type="submit" value="login"/>
          </p>
        </form>
      `, '');
    res.send(html);
});

router.post('/login_process', (req, res) => {
    var post = req.body;
    var email = post.email;
    var password = post.password;
    if(email === auth_data.email && password === auth_data.password) {
        //success
        req.session.is_logined = true;
        req.session.username = auth_data.username;
        req.session.save(() => {
            res.redirect('/');
        });     //세션 객체에 있는 데이터를 이 함수가 세션 스토어에 적용하는 작업을 바로 시작한다. 작업이 모두 끝나면 콜백함수 실행
    } else {
        res.end('Who are you????');
    }
    
});

router.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        res.redirect('/');
    });
});
module.exports = router;