//모듈 사용

let M = {
    name: 'Gren',
    f: function() {
        console.log(this.name);
    }
}

//모듈 외부에서 사용할 수 있도록 해주는 방법
module.exports = M;