# DOM API 사용법 모음

## getElementsByClassName()

**참고 : [MDN web docs](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementsByClassName)**

getElementById와 다르게 class는 여러개 일 수 있으므로 Element에 s가 붙는 것 같다.  
아래와 같이 사용할 수 있다.

```js
var elements = document.getElementsByClassName(names);
var elements = rootElement.getElementsByClassName(names);
```









document는 웹페이지의 컨텐츠(DOM트리, 즉 <body> 또는 <table>과 같은 Element)에 대한 진입접으로서의 역할을 하고,  
해당 문서에 대한 전역적인(globally) 기능(page의 URL가져오기, 문서 내에 새 요소 생성하기 등)을 제공한다.  

rootElement는 처음 봐서 한번 찾아보았는데.. rootElement에 대한 별도의 내용은 없었고 다른 예시에서 아래와 같은 내용을 보았다.  
```
var rootElement = document.documentElement;
var firstTier = rootElement.childNodes;
```

rootElement는 단순히 document.documentElement를 담은 것이었나보다. 그렇다면 document.documentElement는 뭔지 알아보았다.  
MDN web docs에서 설명하는 내용은 아래와 같다.  

**Document.documentElement returns the Element that is the root element of the document (for example, the <html> element for HTML documents).**  
  
Document.documentElement는 document의 root element (예를들자면, HMTL 문서의 <html>요소)를 반환하다고 되어있다.  
root Element의 의미는 해당 문서의 Element를 의미하는 것 같다.
