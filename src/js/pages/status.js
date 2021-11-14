/**
 * @author Belen Garcia
 */

function updateSummaryOfTasks(tasks){
    let numDuties = 0;
    let numUrgent = 0;

    //If there are tasks, let's calculate numDuties and numUrgent
    if(tasks != null){
        numDuties = tasks.length;

        //Calculate number of urgent tasks
        for(let task of tasks){
            let urgent = false;
            if(!task.completed){ //If the task's not completed, check if it's urgent
                let taskDate = new Date(task.deadline).getTime();
                let currentDate = new Date().getTime();
                let sevenDaysTimeInMs = 1000 * 60 * 60 * 24 * 7;
                urgent = (currentDate - taskDate) > sevenDaysTimeInMs? true: false;
            }
            if(urgent) numUrgent++;
        }
    }

    $(".next-to-logo p").remove(); //Remove all p tags inside next-to-logo class
    let nextToLogo = $(".next-to-logo")[0];
    let dutiesP = document.createElement('p');
    let urgentP = document.createElement('p');
    dutiesP.innerHTML = `<p>${numDuties} duties</p>`;
    urgentP.innerHTML = `<p>${numUrgent} urgent</p>`;

    nextToLogo.appendChild(dutiesP);
    nextToLogo.appendChild(urgentP);
}