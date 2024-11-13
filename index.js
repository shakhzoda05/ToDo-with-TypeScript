"use strict";
let todos = [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
let editId = null;
function renderTodos() {
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
function addTodo() {
    const task = todoInput.value.trim();
    if (task) {
        if (editId !== null) {
            const todo = todos.find(t => t.id === editId);
            if (todo)
                todo.task = task;
            editId = null;
        }
        else {
            const newTodo = {
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
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}
function startEdit(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todoInput.value = todo.task;
        editId = id;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    window.addTodo = addTodo;
    window.deleteTodo = deleteTodo;
    window.startEdit = startEdit;
});
