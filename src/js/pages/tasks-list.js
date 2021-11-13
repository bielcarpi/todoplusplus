/**
 * @author Biel Carpi
 */

/*
* This function will be called to display all the current tasks
*/
function displayAllTasks(){
    console.log("Displaying all tasks");
}
//TODO:
//TODO: Pass to server task attributes, and make the server return the correct task HTML
//TODO: 

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
* It will mark as done all selected tasks 
*/
function doneSelectedClicked(){


}

/*
* This function will be called when the "Delete" button has been clicked.
* It will delete all selected tasks on the server, and in the HTML
*/
function deleteSelectedClicked(){
    let checkedTasksNumber = getCheckedTasksNumber();
    let tasksChecked = getTasksByNumber(checkedTasksNumber);
    for(let task of tasksChecked)
        task.remove();

    //TODO: Remove from server too
}


/*
* Returns the number of the tasks that are checked (each task has a number, starting by 0)
*/
function getCheckedTasksNumber(){
    let tasks = $(".task");
    let tasksCheckedNumber = [];
    //Go through all tasks checking whether they're selected or not.
    for(let task of tasks){
        let currentTaskCheckbox = $('#' + task.id + ' input[type=checkbox]')[0];

        //Check whether the current task checkbox is checked.
        if(currentTaskCheckbox.checked){
            let taskNumber = task.id;
            taskNumber = taskNumber.match(/\d+/); //Extract only numbers from that string
            tasksCheckedNumber.push(taskNumber);
        } 
    }

    return tasksCheckedNumber;
}

/*
* Returns the HTML tasks provided its number
*/
function getTasksByNumber(numbers){
    let tasks = [];
    for(let i = 0; i < numbers.length; i++)
        tasks.push($('#task' + numbers[i])); 

    return tasks;
}