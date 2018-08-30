let http = require('http');
let cookie = require('cookie');

let app = http.createServer((req,res)=> {
    console.log(req.headers.cookie);
    let cookies = {};
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies);
    res.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure_cookie=Secured; Secure',        //HTTPS 프로토콜이 아니면 쿠키를 보내지 않는다.
            'HttpOnly_cookie=HttpOnly; HttpOnly',   //JS로 document.cookie를 하면 그 목록이 보이는데, 이를 통해서 보안공격을 할 수 있다. 이 때, HttpOnly를 사용하면 document.cookie에도 나오지 않는다.
            'Path_cookie=Path; Path=/cookie',
            'Domain_cookie=Domain; Domain=o2.org'   //o2.org에서만 동작하는 것이 아니라, 앞에 어떤 주소가 와도 *.o2.org에서 동작한다.
        ]
    });    //쿠키를 사용하기 위해 응답메시지 조작

    
    res.end('Cookie!!');
});
app.listen(3000);