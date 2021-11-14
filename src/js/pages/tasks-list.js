/**
 * @author Biel Carpi
 */

const ALL_DUTIES = 1
const TODAY_DUTIES = 2
const SEARCH_ENGINE = 3
let currentState = ALL_DUTIES // We'll be modifying the current state of the view

/*
* Clears the screen and displays all the current tasks
*/
function displayAllTasks () {
  currentState = ALL_DUTIES
  toggleActiveText()
  clearTasksFromDOM()

  const orderedTasks = orderTasksByDate(getTasks())
  if (orderedTasks == null) { // If there are no tasks, return
    updateSummaryOfTasks(null)
    return
  }

  for (const task of orderedTasks) { addTaskToDOM(getTaskHTML(task)) }

  updateDoneDeleteButtons()
  updateSummaryOfTasks(orderedTasks)
}
/*
* Clears the screen and displays tasks with deadline today
*/
function displayTodayTasks () {
  currentState = TODAY_DUTIES
  toggleActiveText()
  clearTasksFromDOM()

  const orderedTasks = orderTasksByDate(getTodayTasks())
  if (orderedTasks == null) { // If there are no tasks, return
    updateSummaryOfTasks(null)
    return
  }

  for (const task of orderedTasks) { addTaskToDOM(getTaskHTML(task)) }

  updateDoneDeleteButtons()
  updateSummaryOfTasks(orderedTasks)
}
/**
 * Clears the screen and searches for tasks that have the text introduced either in the title, description or category
 * These tasks containing the text will be displayed on the screen
 */
function displayTasksWithText (text) {
  clearTasksFromDOM()
}

/**
 * Disables one text and enables the other one (All duties and today texts)
 */
function toggleActiveText () {
  const allDutiesText = $('#allduties-text')
  const todayText = $('#today-text')

  if (allDutiesText.hasClass('active')) {
    allDutiesText.removeClass('active')
    todayText.addClass('active')
  } else {
    todayText.removeClass('active')
    allDutiesText.addClass('active')
  }
}

/**
 * Given the HTML of a task, add them to the DOM
 */
function addTaskToDOM (taskHTML) {
  const taskDiv = document.createElement('div')
  taskDiv.innerHTML = taskHTML
  $('.task-list')[0].appendChild(taskDiv)
}
/**
 * Clears all tasks from current DOM
 */
function clearTasksFromDOM () {
  $('.task-list')[0].innerHTML = ''
}
/**
 * Given an array of task objects, it will return the array ordered from newer deadline to older deadline
 * If two tasks share the same deadline, they'll be ordered depending on whether they're done or not
 */
function orderTasksByDate (tasks) {
  if (tasks == null) return null

  for (const task of tasks) {
    const dateArray = task.deadline.split('/') // 12/11/2000 will split into 12 (day), 11 (month), 2000 (year)
    task.deadline = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]).getTime()
  }

  // Selection Sort Algorithm :)
  const orderedTasks = []
  for (let i = 0; i < tasks.length; i++) {
    let earlierTask = {
      deadline: 0
    }
    let earlierTaskIndex = 0

    for (let j = 0; j < tasks.length; j++) {
      // If current task is already done (has already been analyzed), go to the next one
      if (tasks[j].hasOwnProperty('done')) continue

      // If current task is earlier than the aux, update the aux
      if (tasks[j].deadline > earlierTask.deadline) {
        earlierTask = tasks[j]
        earlierTaskIndex = j
      }
      // If current task is the same Date as the aux, check whether the aux is completed. If it's not completed and
      //  the current task is, update the aux (we want first the completed tasks)
      else if (tasks[j].deadline == earlierTask.deadline) {
        if (!earlierTask.completed && tasks[j].completed) {
          earlierTask = tasks[j]
          earlierTaskIndex = j
        }
      }
    }

    orderedTasks.push(earlierTask) // Push new earlier task to orderedTasks array
    tasks[earlierTaskIndex].done = true // The tasks that have a 'done' attribute will be the ones that already are ordered
  }

  const localeOptions = { day: 'numeric', month: 'numeric', year: 'numeric' }
  // Reconvert the date deadline to readable deadline
  for (const task of orderedTasks) { task.deadline = new Date(task.deadline).toLocaleString('es-ES', localeOptions) }

  return orderedTasks
}

/**
 *
 */
function taskClicked () {
  console.log('task clicked')
}

/**
 * Updates the Done and Delete buttons depending on whether they should be active or not
 */
function updateDoneDeleteButtons () {
  const buttons = $('.normal-button.squared')

  // If some checkbox is checked, buttons need to be active
  if ($('input[type="checkbox"]:checked')[0] != null) {
    buttons.removeClass('disabled')
    buttons.addClass('enabled')
  } else {
    buttons.removeClass('enabled')
    buttons.addClass('disabled')
  }
}

/*
* This function will be called when the "Select All" button has been clicked.
* It will change the current state of each chechbox (if it's selected, deselect it, and viceversa)
*/
function selectAllClicked () {
  const taskCheckboxes = $('.task input[type=checkbox]')

  if (taskCheckboxes == null) { return }

  // Revert all checkboxes state
  for (const checkbox of taskCheckboxes) { checkbox.checked = !checkbox.checked }

  updateDoneDeleteButtons()
}

/*
* This function will be called when the "Done" button has been clicked.
* It will mark as done all selected tasks. If they're done, they'll be marked as undone
*/
function doneSelectedClicked () {
  const tasksCheckedTitle = getCheckedTasksTitle()
  if (tasksCheckedTitle.length == 0) return

  for (const taskTitle of tasksCheckedTitle) {
    task = getTask(taskTitle)
    deleteTask(taskTitle)
    task.completed = !task.completed // Revert state
    saveTask(task) // Save it again
  }

  switch (currentState) {
    case ALL_DUTIES: displayAllTasks()
      break
    case TODAY_DUTIES: displayTodayTasks()
      break
    case SEARCH_ENGINE: onChangeSearchText()
      break
  }
}
/*
* This function will be called when the "Delete" button has been clicked.
* It will delete all selected tasks on the server, and update the HTML
*/
function deleteSelectedClicked () {
  const checkedTasks = getCheckedTasksTitle()
  if (checkedTasks.length == 0) return

  for (const task of checkedTasks) { deleteTask(task) }

  switch (currentState) {
    case ALL_DUTIES: displayAllTasks()
      break
    case TODAY_DUTIES: displayTodayTasks()
      break
    case SEARCH_ENGINE: onChangeSearchText()
      break
  }
}

/*
* Returns an array of task titles (the ones that are checked)
*/
function getCheckedTasksTitle () {
  const checkedTasks = $('.task')
  const tasksCheckedTitle = []
  // Go through all tasks checking whether they're selected or not.
  for (const task of checkedTasks) {
    // If the checkbox of this task is checked, let's save its name to the tasksCheckedTitle
    if (task.querySelectorAll('input[type=checkbox]')[0].checked) { tasksCheckedTitle.push(task.getElementsByClassName('task-title')[0].innerHTML) }
  }

  return tasksCheckedTitle
}
