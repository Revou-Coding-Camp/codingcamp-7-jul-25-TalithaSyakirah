const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const todoList = document.getElementById('todo-list');
const filter = document.getElementById('filter');

let todos = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = taskInput.value;
  const date = dateInput.value;
  if (task && date) {
    todos.push({ task, date, done: false });
    taskInput.value = '';
    dateInput.value = '';
    displayTodos();
  }
});

filter.addEventListener('change', displayTodos);

function displayTodos() {
  todoList.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (filter.value === 'completed') {
      return todo.done;
    } else if (filter.value === 'uncompleted') {
      return !todo.done;
    }
    return true; // "all"
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) {
      li.classList.add('done');
    }

    li.innerHTML = `
      <div class="left-section">
        <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleDone(${index})">
        <span>
          <strong>${todo.task}</strong><br>
          📅 ${todo.date}
        </span>
      </div>
      <button class="btn-delete" onclick="deleteTodo(${index})">X</button>
    `;
    todoList.appendChild(li);
  });
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  displayTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos();
}
