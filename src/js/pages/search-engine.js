/**
 * @author Biel Carpi
 */

function createSearchEngine(){
    console.log("Creating search engine");


    let searchbox = $('#searchbox')[0];
    searchbox.addEventListener('input', onChangeSearchText);
    searchbox.addEventListener('propertychange', onChangeSearchText); // for IE8
}

function onChangeSearchText(event){
    displayTasksWithText(event.srcElement.value);
}