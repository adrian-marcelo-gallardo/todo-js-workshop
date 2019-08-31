
let tasks = [
  { name: 'Hacer compras', isComplete: false },
  { name: 'Lavar los platos', isComplete: true },
  { name: 'Aprender JavaScript', isComplete: false },
]

function addTask() {
  const taskInput = document.getElementById('taskInput')

  tasks.push({
    name: taskInput.value,
    isComplete: false
  })

  renderTasks()
  taskInput.value = ''
}

function addTaskOnEnter(event) {
  if (event.key === 'Enter') {
    addTask()
  }
}

function removeTask(taskName) {
  tasks = tasks.filter(task => {
    if (task.name === taskName) {
      return false
    } else {
      return true
    }
  })

  renderTasks()
}

function toggleComplete(taskName) {
  const task = tasks.find(task => task.name === taskName)
  task.isComplete = !task.isComplete

  renderTasks()
}

function renderTask(task) {
  return `
    <li class="list-group-item checkbox">
      <div class="row">
        <div class="col-xs-1 checkbox">
          <label>
            <input type="checkbox" onchange="toggleComplete('${task.name}')" ${task.isComplete ? 'checked' : ''}>
          </label>
        </div>
        <div class="col-xs-9 task-text ${task.isComplete ? 'complete' : ''}">
          ${task.name}
        </div>
        <div class="col-xs-2 delete-icon-area">
          <button onclick="removeTask('${task.name}')">
            <i class="delete-icon glyphicon glyphicon-trash"></i>
          </button>
        </div>
      </div>
    </li>
  `
}

function renderTasks() {
  const taskListContainer = document.getElementById('taskList')

  taskListContainer.innerHTML = ''

  tasks.forEach(task => {
    const taskHtml = renderTask(task)

    taskListContainer.innerHTML += taskHtml
  })
}

window.addEventListener('load', () => {
  renderTasks()
})


/*
Challenge extras:
- Validacion input vacio
- Validacion remover tarea incompleta
- Contador de tareas pendientes
- Mostrar mensaje cuando se completen todas las tareas
- Boton remover todas / completar todas
- Guardar tareas en localStorage
- Recuperar tareas del localStorage
- Actualizar solo lo que se modifica del DOM
*/