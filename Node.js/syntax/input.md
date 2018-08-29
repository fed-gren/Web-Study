# Node.js 콘솔에서의 입력값

```js
let args = process.argv;
console.log(args);
```
위와 같이 conditional.js에 입력하고 터미널에서
```js
node conditional.js data
```
라고 실행하면 아래와 같이 출력된다.
```js
[ 'node.exe 경로',        //node.js runtime 경로
  'conditional.js 경로',  //실행 파일 경로
  'data']                //입력값
```

data 뒤에 공백을 넣고 값을 입력하면 여러개의 인자를 던질 수 있고, 이는 순서대로 배열에 채워진다.

```js
터미널 입력
node conditional.js data 1 a


실행결과
[ 'node.exe 경로',
  'conditional.js 경로', 
  'data',
  '1',
  'a']
```