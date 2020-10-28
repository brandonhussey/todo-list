//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(e) {
  //Prevent form submission
  e.preventDefault();

  //create todo div (the actual list)
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create list element
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  //subtask button
  const subTask = document.createElement("button");
  subTask.innerHTML = '<i class="fas fa-plus"></i>';
  subTask.classList.add("more-btn");
  todoDiv.appendChild(subTask);

  //add todo to local storage
  saveLocalTodos(todoInput.value);

  //completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //append to the UL
  todoList.appendChild(todoDiv);

  //clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  //target being clicked (in this case button)
  const item = e.target;

  //delete the item
  if (item.classList[0] === "delete-btn") {
    //grab the parent of the button, the list item
    const todo = item.parentElement;
    //add animation

    todo.classList.add("hinge");

    removeLocalTodos(todo);
    //transitionend will wait for transition to complete before removing element
    todo.addEventListener("animationend", function () {
      todo.remove();
    });
  }

  //complete the item
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todo.classList.toggle("tada");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  //check for existing todos
  //if not, create empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //push passed todo into array
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check for existing todos
  //if not, create empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //basically recreating addTodos function
  //could refactor to make functions for some and just call those

  todos.forEach(function (todo) {
    //create todo div (the actual list)
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create list element
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //subtask button
    const subTask = document.createElement("button");
    subTask.innerHTML = '<i class="fas fa-plus"></i>';
    subTask.classList.add("more-btn");
    todoDiv.appendChild(subTask);

    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to the UL
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //get the index of the specific item trying to delete
  //ensures if there are duplicates that is deletes the specific one attemping to remove, not the first index of
  const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
