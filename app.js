const form = document.getElementById("todoAddForm mt-2");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const i = document.querySelector(".fa fa-remove");
const btnAllDelete = document.querySelector("#todoClearButton");
const btnFilter = document.querySelector("#todoSearch");


let todos = [];
events();

function events(){
form.addEventListener("submit", addTodo);
document.addEventListener("DOMContentLoaded", localToUI);
secondCardBody.addEventListener("click", todoDelete);
btnAllDelete.addEventListener("click", allTodosDelete);
btnFilter.addEventListener("keyup", todoFilter);
}

function todoFilter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todosFromUI = document.querySelectorAll(".list-group-item");
  if (todosFromUI.length > 0) {
    todosFromUI.forEach((todo) => {
      if (todo.textContent.toLowerCase().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "Filtreleme için herhangi bir kayıt yok!");
  }
}

function allTodosDelete() {
  const todosFromUI = document.querySelectorAll(".list-group-item");
  if (todosFromUI.length > 0) {
    todosFromUI.forEach((todo) => {
      todo.remove();
    });
    showAlert("success", "Tüm kayıtlar başarıyla silindi.");
  } else {
    showAlert("danger", "Silinecek kayıt bulunamadı!");
  }
  localStorage.removeItem("todos");
}

function todoDelete(e) {
  if (e.target.className === "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    removeFromStorage(todo.textContent);
    showAlert("success", "Todo başarılı bir şekilde silindi!");
  }
  console.log(e.target);
}

function removeFromStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach((todo, index) => {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  
}

function localToUI() {
  checkTodosFromStorage();
  todos.forEach((todo) => {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen bir todo giriniz!");
  } else {
    addTodoUI(inputText);
    addTodoStorage(inputText);
    showAlert("success", "Todo Eklendi!");
  }

  e.preventDefault();
}

function addTodoUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const infoDiv = document.createElement("div");
  infoDiv.className = "alert alert-" + type + " mt-3";
  infoDiv.textContent = message;

  firstCardBody.appendChild(infoDiv);

  setTimeout(function () {
    infoDiv.remove();
  }, 3000);
}

