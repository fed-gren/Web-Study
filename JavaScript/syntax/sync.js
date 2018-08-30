let fs = require('fs');

//readFileSync

// console.log('A');
// let result = fs.readFileSync('./syntax/sample.txt','utf8');
// console.log(result);
// console.log('C');



//readFile

console.log('A');
fs.readFile('./syntax/sample.txt','utf8', (err, data)=> {
    console.log(data);
});
//readFile이 처리될 동안 console.log('C')를 실행하고 readFile 끝나면 console.log(data);를 실행한다.
console.log('C');