//데이터와 처리방법을 담는 그릇으로서의 객체

//연관된 데이터를 객체에 정리해서 담을 수 있다.
let obj = {
    v1: 'v1',
    v2: 'v2',
    v3: 'v3',
    f1: function() {
        console.log(this.v1);    //자신이 속해있는 객체를 참조하는 방법
    },
    f2: function() {
        console.log(this.v2);
    }
}

obj.f1();
obj.f2();