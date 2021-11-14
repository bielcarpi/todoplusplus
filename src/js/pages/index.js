/** 
*  On index.html Document ready, do the following:
*   - Create HTML to display summary of tasks 
*   - Create HTML to display search engine
*   - Create HTML to display current categories and add new ones
*   - Create HTML to display all tasks
*
* @author Biel Carpi, Pol Saula, Belen Garcia
*/
$(document).ready(function(){
    createSearchEngine();
    createCategoriesSection();
    displayAllTasks();
});