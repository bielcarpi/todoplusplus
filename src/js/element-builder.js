/**
 * The element-builder script will provide the ability to get some HTML element (task, checkbox, etc.)
 *   and pass parameters so as to modify that HTML element on-the-fly
 * @author Biel Carpi, Pol Saula, Belen Garcia
 */

/**
 * Returns HTML representing a task, provided a task Object
 */
function getTaskHTML (task) {
  // Let's cut down the description of the task if it's too large to fit in correctly
  if (task.description.length > 70) task.description = task.description.substring(0, 70)

  // Let's check whether the task is urgent or not (by urgent, it means that its deadline is more than 7 days old)
  let urgent = false
  if (!task.completed) { // If the task's not completed, check
    const taskDate = new Date(task.deadline).getTime()
    const currentDate = new Date().getTime()
    const sevenDaysTimeInMs = 1000 * 60 * 60 * 24 * 7
    urgent = (currentDate - taskDate) > sevenDaysTimeInMs
  }

  // Let's build the HTML for all categories
  // First, we need to convert it to an array of objects. It's now an string [object, object, ...]
  //  stored inside the 'categories' attribute of the task
  let categoryString = task.categories
  categoryString = categoryString.substring(0, categoryString.length - 1) // Delete last ,
  const categories = categoryString.split(',')

  let categoriesHTML = ''
  for (const categoryName of categories) {
    const categoryObject = getCategory(categoryName)
    if (categoryObject == null) continue // If the category of the object hasn't been found as a current category, ignore it

    const categoryHTML = `
            <div class="task-category">
                <span>${categoryObject.title}</span>
                <div style="background-color: ${categoryObject.color};"></div>
            </div>
        `
    categoriesHTML += categoryHTML // Concatenate categories together
  }

  const taskHTML = `
        <div class="task">
            <div class="task-subcontainer task-checkbox-container">
                <input type="checkbox" onChange="updateDoneDeleteButtons()">
            </div>
            <div class="task-subcontainer task-description-container" onClick="taskClicked()">
                <div class="task-image">
                    <img src=${task.image} alt="Imatge ${task.title}">
                </div>
                <div class="task-info">
                    <div class="task-main-info">
                        <h2 class="task-title">${task.title}</h2>
                        <div>
                            <span class="task-completed">${task.completed ? 'Completed' : ''}</span>
                            <span class="task-urgent">${urgent ? 'Urgent!' : ''}</span>
                            <span class="task-date">${task.deadline}</span>
                        </div>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <div class="task-categories">
                        ${categoriesHTML}
                    </div>
                </div>
            </div>
        </div>
    `

  return taskHTML
}

function getCategoryHTML(categoryName, categoryColor){
    return `
        <div class="category">
            <div class="delete-category-button">
                <button class="delete-category-button" onclick="removeCategory(this.parentElement.parentElement)"><i class="fas fa-times"></i></button>
            </div>
            <div class="category-color" style="background-color: ${categoryColor};">
            </div>
            <div class="category-name">
                <p class="name">${categoryName}</p>
            </div>
        </div>
    `
}