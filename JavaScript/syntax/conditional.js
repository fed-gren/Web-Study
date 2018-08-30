let args = process.argv;
console.log(args);

console.log(args[0]);

if(args[2] === '1') {
    console.log('C1');
} else {
    console.log('C2');
}