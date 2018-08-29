function checkKeysInt(e, event) {
    if(event.KetCode) {
        if((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || (code ==8) || (code == 9) || (code ==46)) {
            return;
        } else {
            e.returnValue = false;
        }
    } else if(e.which) {
        let code = e.which;
        if((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || (code ==8) || (code == 9) || (code ==46)) {
            return;
        } else {
            e.preventDefault();
        }
    }
}

let globalArr = new Array();

function createArray() {
    let arr_size = parseInt(document.getElementById('input_arr_size').value);
    let arr = new Array(arr_size);
    globalArr = arr;
    let exNode = document.getElementById('result_msg');
    exNode.removeChild(exNode.childNodes[0]);
    let txtNode = document.createTextNode("크기 "+ arr.length + "의 배열이 생성되었습니다! 검사 도구에서 확인해보세요!(크롬)");

    exNode.appendChild(txtNode);
}

function executeConsoleLog() {
    console.log(globalArr);
}

function pushArray() {
    let add_element = document.getElementById('push_arr_element').value;
    globalArr.push(add_element);
    let exNode = document.getElementById('result_msg');
    exNode.removeChild(exNode.childNodes[0]);
    let txtNode = document.createTextNode("배열에 원소 "+ add_element + "가 추가되었습니다! 검사 도구에서 확인해보세요!(크롬)");

    exNode.appendChild(txtNode);
}

function popArray() {
    globalArr.pop();
    let exNode = document.getElementById('result_msg');
    exNode.removeChild(exNode.childNodes[0]);
    let txtNode = document.createTextNode("배열에 원소가 삭제되었습니다! 검사 도구에서 확인해보세요!(크롬)");

    exNode.appendChild(txtNode);
}

function lengthOfArray() {
    let leng = globalArr.length;
    let exNode = document.getElementById('result_msg');
    exNode.removeChild(exNode.childNodes[0]);
    let txtNode = document.createTextNode("배열의 크기는 "+ leng + "입니다! 검사 도구에서 확인해보세요!(크롬)");

    exNode.appendChild(txtNode);
}