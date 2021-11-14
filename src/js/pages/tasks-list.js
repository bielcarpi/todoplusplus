/**
 * @author Biel Carpi
 */


const ALL_TASKS = 1;
const TODAY_TASKS = 2;
let current_tasks_displaying = ALL_TASKS;

/*
* Clears the screen and displays all the current tasks
*/
function displayAllTasks(){
    current_tasks_displaying = ALL_TASKS;
    clearTasksFromDOM();
    let orderedTasks = orderTasksByDate(getTasks());
    for(let task of orderedTasks)
        addTaskToDOM(getTaskHTML(task));

    updateDoneDeleteButtons();
}
/*
* Clears the screen and displays tasks with deadline today
*/
function displayTodayTasks(){
    current_tasks_displaying = TODAY_TASKS;
    clearTasksFromDOM();
    let tasks = getTasks();
    for(let task of tasks){
    }
}
/**
 * Clears the screen and searches for tasks that have the text introduced either in the title, description or category
 * These tasks containing the text will be displayed on the screen
 */
function displayTasksWithText(text){
    clearTasksFromDOM();

}


/**
 * Given the HTML of a task, add them to the DOM
 */
function addTaskToDOM(taskHTML){
    let taskDiv = document.createElement('div');
    taskDiv.innerHTML = taskHTML;
    $(".task-list")[0].appendChild(taskDiv);
}
/**
 * Clears all tasks from current DOM
 */
function clearTasksFromDOM(){
    $(".task-list")[0].innerHTML = '';
}
/**
 * Given an array of task objects, it will return the array ordered from newer deadline to older deadline
 * If two tasks share the same deadline, they'll be ordered depending on whether they're done or not
 */
function orderTasksByDate(tasks){
    for(let task of tasks){
        let dateArray = task.deadline.split('/'); // 12/11/2000 will split into 12 (day), 11 (month), 2000 (year)
        task.deadline = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]).getTime();
    }

    //Selection Sort Algorithm :)
    let orderedTasks = [];
    for(let i = 0; i < tasks.length; i++){
        let earlierTask = {
            deadline: 0
        };
        let earlierTaskIndex = 0;

        for(let j = 0; j < tasks.length; j++){
            //If current task is already done (has already been analyzed), go to the next one
            if(tasks[j].hasOwnProperty('done')) continue;

            //If current task is earlier than the aux, update the aux
            if(tasks[j].deadline > earlierTask.deadline){
                earlierTask = tasks[j];
                earlierTaskIndex = j;
            }
            //If current task is the same Date as the aux, check whether the aux is completed. If it's not completed and
            //  the current task is, update the aux (we want first the completed tasks)
            else if(tasks[j].deadline == earlierTask.deadline){
                if(!earlierTask.completed && tasks[j].completed){
                    earlierTask = tasks[j];
                    earlierTaskIndex = j;
                }
            }
        }

        orderedTasks.push(earlierTask); //Push new earlier task to orderedTasks array
        tasks[earlierTaskIndex].done = true; //The tasks that have a 'done' attribute will be the ones that already are ordered
    }

    let localeOptions = { day: 'numeric', month: 'numeric', year:'numeric'};
    //Reconvert the date deadline to readable deadline
    for(let task of orderedTasks)
        task.deadline = new Date(task.deadline).toLocaleString("es-ES", localeOptions); 

    return orderedTasks;
}



/**
 * 
 */
function taskClicked(){
    console.log('task clicked');
}


/**
 * Updates the Done and Delete buttons depending on whether they should be active or not
 */
function updateDoneDeleteButtons(){
    let buttons = $(".normal-button.squared");

    //If some checkbox is checked, buttons need to be active
    if($('input[type="checkbox"]:checked')[0] != null){
        buttons.removeClass("disabled");
        buttons.addClass("enabled");
    }
    else{
        buttons.removeClass("enabled");
        buttons.addClass("disabled");
    }
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

    updateDoneDeleteButtons();    
}

/*
* This function will be called when the "Done" button has been clicked.
* It will mark as done all selected tasks. If they're done, they'll be marked as undone 
*/
function doneSelectedClicked(){
    tasksCheckedTitle = getCheckedTasksTitle();
    if(checkedTasks.length == 0) return;

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
    if(checkedTasks.length == 0) return;

    for(let task of checkedTasks)
        deleteTask(task);
    
    displayAllTasks();    
}

/*
* Returns an array of task titles (the ones that are checked)
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
