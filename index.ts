interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

let todos: Todo[] = [];

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
let editId: number | null = null;

function renderTodos(): void {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
      <span>${todo.task}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
      <button onclick="startEdit(${todo.id})">Edit</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo(): void {
  const task = todoInput.value.trim();

  if (task) {
    if (editId !== null) {
      const todo = todos.find(t => t.id === editId);
      if (todo) todo.task = task;
      editId = null;
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        task: task,
        completed: false
      };
      todos.push(newTodo);
    }

    todoInput.value = "";
    renderTodos();
  }
}

function deleteTodo(id: number): void {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function startEdit(id: number): void {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todoInput.value = todo.task;
    editId = id;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  (window as any).addTodo = addTodo;
  (window as any).deleteTodo = deleteTodo;
  (window as any).startEdit = startEdit;
});
