const todos = [];
const addForm = document.querySelector(".add");
const input = document.querySelector(".addInput");
const search = document.querySelector(".search input");
const searchForm = document.querySelector(".search");
let list = document.querySelector(".todos");
const todosText = document.querySelector(".todosOutput p");
let year = document.querySelector("#year");
let todo = document.querySelector(".todoUI");

// add todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim().length < 1) {
    console.log("prevent submit");
    let error = document.querySelector(".errorMsg");
    error.classList.toggle("hide");
    let submit = document.querySelector(".btn");
    submit.disabled = true;
    submit.classList.add("redBtn");

    setTimeout(function () {
      submit.disabled = false;
      submit.classList.remove("redBtn");
      error.classList.toggle("hide");
    }, 2000);
  } else {
    // todos.push(input.value); functionality not working
    todos.push("todo");
    if (todos.length > 0) {
      todosText.classList.add("hide");
    }
    let template = `
  <li class="todoUI">
  <div class='inner'>
  <input type='checkbox' class='cbx'>
  <span class="checkmark"></span>
      <span class='complete span'>${input.value}</span>
      </div>
      <i class="far fa-trash-alt delete"></i>
    </li>`;
    list.innerHTML += template;

    input.value = "";
  }
});

// complete todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("cbx")) {
    let current = e.target;
    let span = current.nextElementSibling.nextElementSibling;
    span.classList.toggle("line-through");
  }
});

// remove todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove(); // take out of UI
    todos.shift();
    if (!todos.length) {
      todosText.classList.remove("hide");
    }
  }
});

// search todos
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

const filterTodos = (term) => {
  // add filtered class
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => {
      todo.classList.add("filtered");
    });

  // remove filtered class
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// filter todos event
search.addEventListener("keyup", (e) => {
  e.preventDefault();
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

// dynamic footer date
year.innerHTML = new Date().getFullYear();
