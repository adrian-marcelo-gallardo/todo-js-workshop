
let tasks = [
  { name: 'Hacer compras', isComplete: false },
  { name: 'Lavar los platos', isComplete: true },
  { name: 'Aprender JavaScript', isComplete: false },
]

function addTask() {
  const taskInput = document.getElementById('taskInput')

  if (!taskInput.value || taskInput.value.trim() === '') {
    return
  }

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
  const task = tasks.find(task => task.name === taskName)

  if (!task.isComplete) {
    if (!confirm('La tarea aún no está completa, ¿Estás seguro?')) {
      return
    }
  }
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

function allTasksCompleted() {
  return tasks.every(task => task.isComplete)
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

  toggleSuccessMsg(allTasksCompleted())
  updateCompletedCounter()
}

function toggleSuccessMsg(display) {
  const successMsg = document.getElementById('successMsg')

  if (display) {
    successMsg.classList.remove('hidden')
  } else {
    successMsg.classList.add('hidden')
  }
}

function updateCompletedCounter() {
  const numCompletedTxt = document.getElementById('numCompleted')
  const numTotalTxt = document.getElementById('numTotal')

  const numCompleted = tasks.filter(task => task.isComplete).length
  const numTotal = tasks.length

  numTotalTxt.innerText = numTotal
  numCompletedTxt.innerText = numCompleted

  updateCounterStatus(numCompleted, numTotal)
}

function updateCounterStatus(numCompleted, numTotal) {
  const counter = document.getElementById('counter')
  const numPending = numTotal - numCompleted

  counter.classList.remove('badge-success', 'badge-danger', 'badge-warning')
  switch(numPending) {
    case 0:
      counter.classList.add('badge-success')
      break;
    case numTotal:
      counter.classList.add('badge-danger')
      break;
    default:
      counter.classList.add('badge-warning')
  }
}

function storeTasks() {
  window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

function restoreTasks() {
  const _tasks = window.localStorage.getItem('tasks')

  if (_tasks) {
    tasks = JSON.parse(_tasks)
  }
}

window.addEventListener('load', () => {
  restoreTasks()
  renderTasks()
})

window.addEventListener("beforeunload", () => {
  storeTasks()
});


/*
Challenge extras:
- Validacion input vacio
- Validacion remover tarea incompleta
- Contador de tareas pendientes
- Mostrar mensaje cuando se completen todas las tareas
- Boton remover todas / completar todas
- Guardar tareas en localStorage
- Recuperar tareas del localStorage
*/