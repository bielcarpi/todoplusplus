/**
 * @author Belen Garcia
 */

function createCategoriesSection () {
  console.log('Creating categories section')
  updateCategoryList();
}

function newCategory () {
  const categoryName = $('#category-name')[0].value;
  const categoryColor = $('#category-color')[0].value;

  const category = {
    title: categoryName,
    color: categoryColor
  }
  saveCategory(category)
  updateCategoryList();

  switch (currentState) {
    case ALL_DUTIES: displayAllTasks()
      break
    case TODAY_DUTIES: displayTodayTasks()
      break
    case SEARCH_ENGINE: onChangeSearchText()
      break
  }
}

function removeCategory (categoryHTML) {
  const categoryName = categoryHTML.getElementsByClassName('name')[0].innerHTML;
  deleteCategory(categoryName); //Delete the category
  updateCategoryList(); //And load again the category list

  switch (currentState) {
    case ALL_DUTIES: displayAllTasks()
      break
    case TODAY_DUTIES: displayTodayTasks()
      break
    case SEARCH_ENGINE: onChangeSearchText()
      break
  }
}

function updateCategoryList(){
    const categoryListDiv = $('.category-list')[0];
    const categories = getCategories();

    categoryListDiv.innerHTML = ''; //Clean possible current categories
    if(categories == null) return; //If there aren't categories, we're done

    for(const category of categories){
        let categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = getCategoryHTML(category.title, category.color);
        categoryListDiv.appendChild(categoryDiv);
    }
}