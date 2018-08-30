let members = ['kim', 'lee', 'park'];
console.log(members[1]);       //lee

let i = 0;
while (i < members.length) {
    console.log(members[i]);
    i += 1;
}

console.log("=============");

//객체는 어떤 역할에 대한 정보를 담을 때 배열보다 유용하다.
let roles = {
    'programmer': 'lee',
    'designer': 'min',
    'manager': 'park'
}
console.log(roles.designer);  //min

//객체의 반복

for(let name in roles) {
    console.log(name, roles[name]);
}


let obj = {
    "color":"red",
    "shape":"rectangle",
    "width":100,
}

for(let key in obj) {
    console.log(key, "=>" ,obj[key]);
}