document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const itemsLeft = document.getElementById("items-left");
  const clearCompletedButton = document.getElementById("clear-completed");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let todos = [];

  const renderTodos = (filter = "all") => {
    todoList.innerHTML = "";
    const filteredTodos = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    filteredTodos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.className = `todo-item ${todo.completed ? "completed" : ""}`;
      todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} data-index="${index}" />
                <span class="todo-text">${todo.text}</span>
                <button class="delete-todo" data-index="${index}">✖</button>
            `;
      todoList.appendChild(todoItem);
    });

    itemsLeft.textContent = `${todos.filter((todo) => !todo.completed).length} Aufgaben übrig`;
  };

  const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      todos.push({ text: todoText, completed: false });
      todoInput.value = "";
      renderTodos();
    }
  };

  const toggleTodoCompletion = (index) => {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
  };

  const clearCompletedTodos = () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  };

  addTodoButton.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-checkbox")) {
      const index = e.target.dataset.index;
      toggleTodoCompletion(index);
    } else if (e.target.classList.contains("delete-todo")) {
      const index = e.target.dataset.index;
      deleteTodo(index);
    }
  });

  clearCompletedButton.addEventListener("click", clearCompletedTodos);

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      renderTodos(e.target.dataset.filter);
    });
  });

  renderTodos();
});
