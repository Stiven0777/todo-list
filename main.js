const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button class="complete-btn">Completar</button>
      <button class="delete-btn">Eliminar</button>
    `;
    taskList.appendChild(taskItem);

    const completeBtn = taskItem.querySelector(".complete-btn");
    const deleteBtn = taskItem.querySelector(".delete-btn");

    completeBtn.addEventListener("click", completeTask);
    deleteBtn.addEventListener("click", deleteTask);

    taskInput.value = "";
  }
}

function completeTask(event) {
  const taskItem = event.target.closest(".task-item");
  taskItem.classList.toggle("completed-task");
}

function deleteTask(event) {
  const taskItem = event.target.closest(".task-item");
  taskItem.remove();
}

async function fetchTasksFromAPI() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const tasks = await response.json();

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <span class="task-text">${task.title}</span>
        <button class="complete-btn">Completar</button>
        <button class="delete-btn">Eliminar</button>
      `;
    taskList.appendChild(taskItem);

    // Resto del código para agregar botones de completar y eliminar
  });
}

function saveTasksToLocalStorage() {
  const taskItems = document.querySelectorAll(".task-item");
  const tasks = [];

  taskItems.forEach((taskItem) => {
    tasks.push({
      text: taskItem.querySelector(".task-text").textContent,
      completed: taskItem.classList.contains("completed-task"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    savedTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
          <span class="task-text">${task.text}</span>
          <button class="complete-btn">Completar</button>
          <button class="delete-btn">Eliminar</button>
        `;
      if (task.completed) {
        taskItem.classList.add("completed-task");
      }
      taskList.appendChild(taskItem);

      // Resto del código para agregar botones de completar y eliminar
    });
  }
}
function showMessage(message, className) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
  statusMessage.classList.add(className);
  statusMessage.style.display = "block";

  setTimeout(() => {
    statusMessage.style.display = "none";
    statusMessage.classList.remove(className);
  }, 2000); // Ocultar después de 2 segundos
}

function completeTask(event) {
  const taskItem = event.target.closest(".task-item");
  taskItem.classList.toggle("completed-task");

  if (taskItem.classList.contains("completed-task")) {
    showMessage("Tarea entregada", "completed-message");
  }
}

function deleteTask(event) {
  const taskItem = event.target.closest(".task-item");

  if (taskItem.classList.contains("completed-task")) {
    showMessage("Tarea entregada, no se puede eliminar", "error-message");
  } else {
    showMessage("Tarea no entregada", "info-message");
    taskItem.remove();
    saveTasksToLocalStorage();
  }
}

const taskItems = document.querySelectorAll(".task-item");

taskItems.forEach((taskItem) => {
  taskItem.addEventListener("mouseover", () => {
    taskItem.style.transform = "rotateY(10deg)";
  });

  taskItem.addEventListener("mouseout", () => {
    taskItem.style.transform = "rotateY(0deg)";
  });
});
