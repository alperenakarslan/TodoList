// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners() { // Tüm event listenersler
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo giriniz.");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarılı bir şekilde eklendi.")
    }




    e.preventDefault();
}

function getTodosFromStorage(){ // storageden todoları almak.
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    // setTimeOut metodu

    setTimeout(function () {
        alert.remove();
    }, 1500)
}


function addTodoToUI(newTodo) { // string değerini list item olarak uı'a ekleyecek.

    // <li class="list-group-item d-flex justify-content-between" >
    //     Todo 1
    //     < a href="#" class="delete-item" >
    //         <i class="fa fa-remove"></i>
    //     </a >

    // </li>

    // list item oluşturma
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    //link oluşturma
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text node ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}