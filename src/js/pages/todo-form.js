var fields = {};

function changeTaskImage(){
    var targetElement = event.target;
    document.getElementById('taskLogo').src = targetElement.src;
}
