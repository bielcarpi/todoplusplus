/**
 * @author Belen Garcia
 */

function createCategoriesSection () {
  console.log('Creating categories section')
}

function addCategory () {
  const name = document.getElementById('category-name').value
  const color = document.getElementById('category-color').value
  // if (checkName(name) == 0 && checkColor(color) == 0 ) {
  const category = {
    title: name,
    color: color
  }
  saveCategory(category)
  // }
}

function removeCategory () {
  const name = document.getElementById('name').value
  deleteCategory(name)
}

/*
function checkName(name){
    if (name.length < 2){
        return -1;
    } else {
        return 1;
    }
}

function checkColor(color){
    if (color == null){
        return -1;
    } else {
        return 1;
    }
} */
