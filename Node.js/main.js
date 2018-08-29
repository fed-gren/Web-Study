let http = require('http');
let fs = require('fs');
let app = http.createServer(function (req, res) {
    let url = req.url;
    if (req.url === '/') {
        url = '/index.html';
    }
    if (req.url === '/favicon.ico') {
        return res.writeHead(404);
    }

    res.writeHead(200);
    console.log(__dirname + url);
    res.end(fs.readFileSync(__dirname + url));  //사용자에게 전송할 데이터
});
app.listen(3000);