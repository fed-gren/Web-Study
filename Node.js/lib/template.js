//template 모듈화

//객체 활용, 함수 정리 -> refactoring : 동작은 똑같지만 코드의 효율을 더 높이는 것. 중요한 작업이다.
module.exports = {
    HTML: function (title, list, body, control, auth_status_ui =
        `<a href="/login">log in</a>`) {
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        ${auth_status_ui}
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
        </body>
        </html>
        `;
    },
    list: function (filelist) {
        let list = '<ul>';
        for (let i = 0; i < filelist.length; i++) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += '</ul>';

        return list;
    }
}

