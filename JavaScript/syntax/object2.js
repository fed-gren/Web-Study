//객체지향 프로그래밍

/**
 * 데이터를 정리하는 도구? -> array, object
 * JS에서 처리하는 코드가 많아지면? -> function으로 묶음
 * 함수(function)는 처리해야 할 일에 대한 정보를 가지고 있는 구문이면서
 * 동시에 값이 될 수 있다.
 */

//모든 statement가 값이 되는 것은 아니다.
//  let i = if(true) {console.log(1)}  //오류 발생


//JavaScript의 특징! 함수가 값이 될 수 있다.
 let f1 = function() {
     console.log("f1 실행");
 }

 console.log(f1);       //[Function: f1]
 f1();      //f1 실행

 //배열의 원소, 객체의 value로 함수가 들어갈 수 있다.

 let arr = [f1];

arr[0]();       //f1 실행

let obj = {
    function : f1
}
obj.function();     //f1 실행

