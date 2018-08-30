let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
let template = require('./lib/template');
let path = require('path');
let sanitizeHtml = require('sanitize-html');

let app = http.createServer((req, res) => {
    let _url = req.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (err, filelist) => {
                console.log(filelist);
                let title = 'Welcome';
                let desc = 'Hello, Node.js';
                let list = template.list(filelist);
                let html = template.HTML(title, list, `<h2>${title}</h2>\
                                <p>${desc}</p>`,
                    `<a href="/create">create</a>`);
                res.writeHead(200);
                res.end(html);  //사용자에게 전송할 데이터
            });
        } else {
            fs.readdir('./data', (err, filelist) => {
                let filtered_id = path.parse(queryData.id).base;
                fs.readFile(`data/${filtered_id}`, 'utf8', (err, desc) => {
                    let title = queryData.id;
                    let sanitized_title = sanitizeHtml(title);
                    let sanitized_desc = sanitizeHtml(desc, {
                        allowedTags:["h1"]
                    });
                    let list = template.list(filelist);
                    let html = template.HTML(sanitized_title, list, `<h2>${sanitized_title}</h2>\
                                    <p>${sanitized_desc}</p>`,
                        `<a href="/create">create</a>
                                    <a href="/update?id=${sanitized_title}">update</a>
                                    <form action="/delete_process" method="post">
                                        <input type="hidden" name="id" value="${sanitized_title}">
                                        <input type="submit" value="delete">
                                    </form>`);
                    res.writeHead(200);
                    res.end(html);
                });
            });

        }

    } else if (pathname === "/create") {
        fs.readdir('./data', (err, filelist) => {
            console.log(filelist);
            let title = 'Web - create';
            let list = template.list(filelist);
            let html = template.HTML(title, list, `<h2>${title}</h2>\
            <form action="/create_process" method="POST"> <!--서버로부터 데이터를 가져올 때, 즉 GET 방식으로 통신할 땐 url에 쿼리스트링이 보이는 것이 괜찮지만, CRUD등, 서버에 있는 데이터에 대한 변경이 있을 땐, url에 정보가 있으면 안된다. 그래서 form method를 post로 변경해줘야한다.-->
            <p>
                <input type="text" name="title" placeholder="제목 입력">
            </p>
            <p><textarea name="content" id="" cols="30" rows="10" placeholder="내용 입력"></textarea></p>
            <p>
                <input type="submit">
            </p>
        </form>`, ``);
            res.writeHead(200);
            res.end(html);  //사용자에게 전송할 데이터
        });
    } else if (pathname === "/create_process") {
        let body = '';
        req.on('data', (data) => {      //웹 브라우저가 데이터 요청했는데 그 양이 엄청 많으면 문제가 발생할 수 있다. 그래서 콜백이 실행될때마다 나눠서 데이터를 추가해줌
            body += data;

            // if(body.length > 1e6) {     //그렇게 해서 들어온 데이터가 너무 많으면 아예 연결을 끊는다. 이번 코드에서 적용은 안함
            //     req.connection.destroy();
            // }
        });

        req.on('end', () => {       //조각조각 들어오다가 더이상 들어올게 없으면 end에 해당하는 콜백함수를 실행하는 것으로 약속되어있는 것이다.
            let post = qs.parse(body);
            let title = post.title;
            let content = post.content;
            fs.writeFile(`data/${title}`, content, 'utf8', (err) => {
                if (err) throw err;
                res.writeHead(302, { Location: `/?id=${title}` });
                res.end();  //사용자에게 전송할 데이터
            });
        });

    } else if (pathname === "/update") {
        fs.readdir('./data', (err, filelist) => {
            let filtered_id = path.parse(queryData.id).base;
            fs.readFile(`data/${filtered_id}`, 'utf8', (err, desc) => {
                let title = queryData.id;
                let list = template.list(filelist);
                let html = template.HTML(title, list,
                    `
                                <form action="/update_process" method="POST"> <!--서버로부터 데이터를 가져올 때, 즉 GET 방식으로 통신할 땐 url에 쿼리스트링이 보이는 것이 괜찮지만, CRUD등, 서버에 있는 데이터에 대한 변경이 있을 땐, url에 정보가 있으면 안된다. 그래서 form method를 post로 변경해줘야한다.-->
                                    <input type="hidden" name="id" value="${title}">
                                <p>
                                        <input type="text" name="title" placeholder="제목 입력" value="${title}">
                                    </p>
                                    <p><textarea name="content" id="" cols="30" rows="10" placeholder="내용 입력">${desc}</textarea></p>
                                    <p>
                                        <input type="submit">
                                    </p>
                                </form>
                                `,
                    `<a href="/create">create</a>
                                <a href="/update?id=${title}">update</a>`);
                res.writeHead(200);
                res.end(html);
            });
        });

    } else if (pathname === "/update_process") {
        let body = '';
        req.on('data', (data) => {      //웹 브라우저가 데이터 요청했는데 그 양이 엄청 많으면 문제가 발생할 수 있다. 그래서 콜백이 실행될때마다 나눠서 데이터를 추가해줌
            body += data;

            // if(body.length > 1e6) {     //그렇게 해서 들어온 데이터가 너무 많으면 아예 연결을 끊는다. 이번 코드에서 적용은 안함
            //     req.connection.destroy();
            // }
        });

        req.on('end', () => {       //조각조각 들어오다가 더이상 들어올게 없으면 end에 해당하는 콜백함수를 실행하는 것으로 약속되어있는 것이다.
            let post = qs.parse(body);
            let id = post.id;
            let filtered_id = path.parse(id).base;
            let title = post.title;
            let content = post.content;
            fs.rename(`data/${filtered_id}`, `data/${title}`, (err) => {
                fs.writeFile(`data/${title}`, content, 'utf8', (err) => {
                    if (err) throw err;
                    res.writeHead(302, { Location: `/?id=${title}` });
                    res.end();  //사용자에게 전송할 데이터
                });
            });
        });
    } else if (pathname === "/delete_process") {
        let body = '';
        req.on('data', (data) => {      //웹 브라우저가 데이터 요청했는데 그 양이 엄청 많으면 문제가 발생할 수 있다. 그래서 콜백이 실행될때마다 나눠서 데이터를 추가해줌
            body += data;

            // if(body.length > 1e6) {     //그렇게 해서 들어온 데이터가 너무 많으면 아예 연결을 끊는다. 이번 코드에서 적용은 안함
            //     req.connection.destroy();
            // }
        });

        req.on('end', () => {       //조각조각 들어오다가 더이상 들어올게 없으면 end에 해당하는 콜백함수를 실행하는 것으로 약속되어있는 것이다.
            let post = qs.parse(body);
            let id = post.id;
            let filtered_id = path.parse(id).base;
            fs.unlink(`data/${filtered_id}`, (err) => {
                if (err) throw err;
                res.writeHead(302, { Location: `/` });
                res.end();  //사용자에게 전송할 데이터
            });

        });
    } else {
        res.writeHead(404);     //파일을 찾을 수 없는 경우
        res.end('Not Found');
    }
});
app.listen(3000);