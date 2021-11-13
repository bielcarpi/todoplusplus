/**
 * @author Pol Saula
 */

$(document).ready(function(){
    var categories = getCategories();

    if(categories != null){
        for (let i = 0; i < categories.length; i++) {
            let option = document.createElement("option");
            option.textContent = categories[i].title;
            document.getElementById('taskCategory').appendChild(option);
        }
    }
});

function changeTaskImage(){
    var targetElement = event.target;
    document.getElementById('taskLogo').src = targetElement.src;
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString){
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
        return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12){
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function validateFormOnSubmit(){
    var error = 0;

    const image = document.getElementById('taskLogo');
    const title = document.getElementById('taskTitle');
    const deadline = document.getElementById('taskDeadline');
    const category = document.getElementById('taskCategory');
    const description = document.getElementById('taskDescription');
    const completed = document.getElementById('taskCompleted');

    document.getElementById('errorname').innerHTML = "";

    //Validate task's Title
    if(title.value == "" || title.value.length > 100){
        document.getElementById('errorname').innerHTML="Title required. Maximum 100 characters lenght.";
        title.focus();
        error = 1;
    }

    //Validate task's deadline
    if(!isValidDate(deadline.value)){
        document.getElementById('errorname').innerHTML="Required date format: mm/dd/yyyy";
        deadline.focus();
        error = 1;
    }

    //Validate task's Categories
    if(category.value == "Select category"){
        document.getElementById('errorname').innerHTML="You must select at least 1 category.";
        category.focus();
        error = 1;
    }
    

    //Validate task's Description
    if(description.value == "" || description.value.length > 1000){
        document.getElementById('errorname').innerHTML="Description required. Maximum 1.000 characters lenght.";
        description.focus();
        error = 1;
    }

    console.log(category.value);

    if(error == 0){
        var task = {
            'title': title.value,
            'image': image.src,
            'deadline': deadline.value,
            'category': category.value,
            'description': description.value,
            'completed': completed.value
        }

        saveTask(task);
    }

}
