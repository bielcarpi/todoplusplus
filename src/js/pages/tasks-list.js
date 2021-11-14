/**
 * @author Biel Carpi
 */


/*
* Clears the screen and displays all the current tasks
*/
function displayAllTasks(){
    clearTasksFromDOM();
    let tasks = getTasks();
    for(let task of tasks)
        addTaskToDOM(getTaskHTML(task));
}

/*
* Clears the screen and displays tasks with deadline today
*/
function displayTodayTasks(){
    clearTasksFromDOM();
    let tasks = getTasks();
    for(let task of tasks){

    }
}

/**
 * Given an array of task objects, it will return the array ordered from newer deadline to older deadline
 * If two tasks share the same deadline, they'll be ordered depending on whether they're done or not
 */
function orderTasksByDate(tasks){

}

function addTaskToDOM(taskHTML){
    let taskDiv = document.createElement('div');
    taskDiv.innerHTML = taskHTML;
    $(".task-list")[0].appendChild(taskDiv);
}

function clearTasksFromDOM(){
    $(".task-list")[0].innerHTML = '';
}


function taskClicked(){
    console.log('task clicked');
}


/*
* This function will be called when the "Select All" button has been clicked.
* It will change the current state of each chechbox (if it's selected, deselect it, and viceversa)
*/
function selectAllClicked(){
    let taskCheckboxes = $(".task input[type=checkbox]");

    if(taskCheckboxes == null)
        return;

    //Revert all checkboxes state
    for(let checkbox of taskCheckboxes)
        checkbox.checked = !checkbox.checked;
}

/*
* This function will be called when the "Done" button has been clicked.
* It will mark as done all selected tasks. If they're done, they'll be marked as undone 
*/
function doneSelectedClicked(){
    tasksCheckedTitle = getCheckedTasksTitle();

    for(let taskTitle of tasksCheckedTitle){
        task = getTask(taskTitle);
        deleteTask(taskTitle);
        task.completed = task.completed? false: true; //Revert state
        saveTask(task); //Save it again
    }

    displayAllTasks();
}

/*
* This function will be called when the "Delete" button has been clicked.
* It will delete all selected tasks on the server, and update the HTML
*/
function deleteSelectedClicked(){
    let checkedTasks = getCheckedTasksTitle();
    for(let task of checkedTasks)
        deleteTask(task);
    
    displayAllTasks();    
}


/*
* Returns the number of the tasks that are checked (each task has a number, starting by 0)
*/
function getCheckedTasksTitle(){
    let checkedTasks = $(".task");
    let tasksCheckedTitle = [];
    //Go through all tasks checking whether they're selected or not.
    for(let task of checkedTasks){
        //If the checkbox of this task is checked, let's save its name to the tasksCheckedTitle
        if(task.querySelectorAll('input[type=checkbox]')[0].checked)
            tasksCheckedTitle.push(task.getElementsByClassName('task-title')[0].innerHTML);
    }

    return tasksCheckedTitle;
}
