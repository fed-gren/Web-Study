let http = require('http');
let fs = require('fs');
let url = require('url');

function boardTemplateList(filelist) {
    let list = '<ul>';

    for (let i = filelist.length - 1; i >= 0; i--) {

        list += '<li class="list_title">';
        list += '<article>';
        list += `<section class="list_title"><a href="/?id=${filelist[i]}">${filelist[i]}</a></section>`;
        list += '</article>';
        list += '</li>';
    }
    list += '</ul>';
    return list;
}

let app = http.createServer((req, res) => {
    let req_url = req.url;
    let queryData = url.parse(req_url, true).query;
    let pathname = url.parse(req_url, true).pathname;
    let board_title = queryData.id;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', 'utf8', (err, filelist) => {

                // <ul>
                //     <li class="list_item">
                //         <article>
                //             <section class="list_title"><a href="/?id=list3">title 3</a></section>
                //         </article>
                //     </li>
                //     <li class="list_item">
                //         <article>
                //             <section class="list_title"><a href="/?id=list2">title 2</a></section>
                //         </article>
                //     </li>
                //     <li class="list_item">
                //         <article>
                //             <section class="list_title"><a href="/?id=list1">title 1</a></section>
                //         </article>
                //     </li>
                // </ul>
                let list = boardTemplateList(filelist);
                let board_template = `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>${board_title}</title>
                    <link rel="stylesheet" href="./style.css">
                </head>
                
                <body>
                    <section class="wrapper">
                        <section id="board_title_area">
                            <h1><a href="/">Board</a></h1>
                        </section>
                        <section id="list_area">
                        ${list}
                    </section>
                        <section id="btn_area">
                            <a href="#">write</a>
                        </section>
                    </section>
                </body>
                
                </html>`;
                res.writeHead(200);
                res.end(board_template);
            });
        } else {
            fs.readdir('./data', 'utf8', (err, filelist) => {
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, content) => {
                    let list = boardTemplateList(filelist);
                    let board_template = `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>${board_title}</title>
                    <link rel="stylesheet" href="./style.css">
                </head>
                
                <body>
                    <section class="wrapper">
                        <section id="board_title_area">
                            <h1><a href="/">Board</a></h1>
                        </section>
                        ${content}
                        <section id="btn_area">
                            <a href="#">write</a>
                        </section>
                    </section>
                    ${list}
                </body>
                
                </html>`;
                    res.writeHead(200);
                    res.end(board_template);
                });
            });
        }
    } else {
        res.writeHead(404);
        res.end();
    }

});

app.listen(8080);