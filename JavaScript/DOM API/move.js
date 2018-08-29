let todo = document.getElementById("list_todo");
let doing = document.getElementById("list_doing");

let todo_item = todo.getElementsByClassName("list_item");

function move_to_doing() {
}

console.log("item num : " + todo_item.length);
for (let i = 0; i < todo_item.length; i++) {
    todo_item[i].addEventListener("click", function() {
        let btn = todo_item[i].getElementsByClassName("btn_next");
        // doing.appendChild(todo_item[i]);
        // todo_item = todo.getElementsByClassName("list_item");
        console.log("btn : " + btn);
        console.log("btn : " + btn[i].parentNode.innerHTML);
    });
    
}



// function move_to_next() {
//     console.log('next');
// }

// document.getElementsByClassName("btn_next").addEventListener("click",move_to_next());

// document.addEventListener("DOMContentLoaded", function() {
//     let card = new Array();
//     card = document.getElementsByClassName("list_item");
//     console.log("card : " + card[0].innerText);
// });
