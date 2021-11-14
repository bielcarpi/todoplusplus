/**
 * @author Pol Saula
 */

$(document).ready(function () {
  const categories = getCategories()

  if (categories != null) {
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement('option')
      option.textContent = categories[i].title
      document.getElementById('select-category').appendChild(option)
    }
  }
})

/**
 * Changes the image of the task with the image clicked
 */
function changeTaskImage () {
  const targetElement = event.target
  document.getElementById('taskLogo').src = targetElement.src
}

/**
 * Validates that the input string is a valid date formatted as "dd/mm/yyyy"
 *   and that it's between the year 2000 and 2200
 */
function isValidDate (dateString) {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false
  }

  // Parse the date parts to integers
  const parts = dateString.split('/')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)

  // Check the ranges of month and year
  if (year < 2000 || year > 2200 || month == 0 || month > 12) {
    return false
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1]
}

/**
 * Validates the form, possibly showing error messages.
 * If the form is correct, saves the task data and returns to the root page
 */
function validateFormOnSubmit () {
  const image = document.getElementById('taskLogo')
  const title = document.getElementById('taskTitle')
  const deadline = document.getElementById('taskDeadline')
  const category = document.getElementById('select-category')
  const description = document.getElementById('taskDescription')
  const completed = document.getElementById('taskCompleted')
  const error = document.getElementById('errorname')

  error.innerHTML = ''

  // Validate task's Title
  if (title.value == '' || title.value.length > 100) {
    error.innerHTML = 'Title required. Maximum 100 characters lenght.'
    title.focus()
    return
  }

  // Validate task's deadline
  if (!isValidDate(deadline.value)) {
    error.innerHTML = 'Date not valid. Required date format: dd/mm/yyyy'
    deadline.focus()
    return
  }

  // Validate task's Categories
  if (category.value == 'Select category') {
    error.innerHTML = 'You must select at least 1 category.'
    category.focus()
    return
  }

  // Validate task's Description
  if (description.value == '' || description.value.length > 1000) {
    error.innerHTML = 'Description required. Maximum 1.000 characters lenght.'
    description.focus()
    return
  }

  const imageSrc = document.createElement('a') // We only want the relative url. The a tag allows us to select different parts of the url
  imageSrc.href = image.src
  const task = {
    title: title.value,
    image: imageSrc.pathname,
    deadline: deadline.value,
    categories: category.value + ',', // Multiple categories should follow the format --> 'Uni Projects,Development,',
    description: description.value,
    completed: completed.checked
  }
  saveTask(task)
  window.location.replace('/') // Redirect to root / once the task has been saved
}
