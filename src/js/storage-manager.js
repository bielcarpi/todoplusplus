/**
 * @author Biel Carpi
 */

function saveTask(task){
    saveToLocalStorage('tasksArray', task);
}
function getTasks(){
    return getFromLocalStorage('tasksArray');
}
function getTodayTasks(){
    let allTasks = getFromLocalStorage('tasksArray');
    if(allTasks == null) return null; // Return null if there aren't tasks

    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); //We don't want time, only the date
    todayDate = todayDate.getTime();

    let todayTasks = [];
    for(let task of allTasks){
        let dateArray = task.deadline.split('/'); // 12/11/2000 will split into 12 (day), 11 (month), 2000 (year)
        let deadline = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]).getTime();

        if(deadline == todayDate) todayTasks.push(task); //If the deadline of the task is today, push it to the todayTasks array
    }

    return todayTasks.length == 0? null: todayTasks; //Return null if todayTasks is empty. Else, return todayTasks
}
function getTask(taskTitle){
    let tasks = getFromLocalStorage('tasksArray')
    for(let i = 0; i < tasks.length; i++)
        if(tasks[i].title == taskTitle) return tasks[i];

    return null;
}
function deleteTask(taskTitleToRemove){
    deleteFromLocalStorage('tasksArray', taskTitleToRemove);
}


function saveCategory(category){
    saveToLocalStorage('categoriesArray', category);
}
function getCategories(){
    return getFromLocalStorage('categoriesArray');
}
function getCategory(categoryTitle){
    let categories = getFromLocalStorage('categoriesArray')
    for(let i = 0; i < categories.length; i++)
        if(categories[i].title == categoryTitle) return categories[i];

    return null;
}
function deleteCategory(categoryTitleToRemove){
    deleteFromLocalStorage('categoriesArray', categoryTitleToRemove);
}


/**
 * Methods directly talking to localStorage 
 */
function saveToLocalStorage(nameOfKey, object){
    if(localStorage.getItem(nameOfKey) == null || localStorage.getItem(nameOfKey) === ''){
        localStorage.setItem(nameOfKey, convertObjectToStringifiedArray(object));
    }
    else{
        let stringifiedArray = localStorage.getItem(nameOfKey);
        localStorage.setItem(nameOfKey, stringifiedArray + convertObjectToStringifiedArray(object));
    }
}
function getFromLocalStorage(nameOfKey){
    return getObjectsFromStringifiedArray(localStorage.getItem(nameOfKey));
}
function deleteFromLocalStorage(nameOfKey, objectTitleToRemove){
    //For this method to work properly, the objects that are passed need to have a title property (the one property which will be compared for removing)
    let objects = getObjectsFromStringifiedArray(localStorage.getItem(nameOfKey));
    for(let i = 0; i < objects.length; i++)
        if(objects[i].title == objectTitleToRemove)
            objects.splice(i, 1);
    
    localStorage.setItem(nameOfKey, convertObjectsToStringifiedArray(objects)); //Save all the objects without the removed one
}


/**
 * Methods that manage the parsing of the objects to a single string 
 * A string will follow the format "object;object;object;..."
 */
function convertObjectsToStringifiedArray(objectsArray){
    if(objectsArray == '' || objectsArray == null) return '';

    let stringifiedArray = '';
    for(let i = 0; i < objectsArray.length; i++)
        stringifiedArray += convertObjectToStringifiedArray(objectsArray[i]);

    return stringifiedArray;
}
function convertObjectToStringifiedArray(object){
    if(object == null || object == '') return '';
    return JSON.stringify(object) + ';';
}
function getObjectsFromStringifiedArray(stringifiedArray){
    if(stringifiedArray == '' || stringifiedArray == null) return null;

    stringifiedArray = stringifiedArray.substring(0, stringifiedArray.length - 1); //Delete last ;
    let stringObjects = stringifiedArray.split(';');
    let objects = [];
    for(let stringObject of stringObjects)
        objects.push(JSON.parse(stringObject));

    return objects;
}
