function createCategoriesSection(){
    console.log("Creating categories section");
}

function addCategory(){
    const name = document.getElementById('category-name').value;
    const color = document.getElementById('category-color').value;
    let category = { 
        title: name, 
        color: color
    }
    saveCategory(category);
}

function removeCategory(){
    var el = document.getElementsByClassName('category-name').value;
    el.remove();
    deleteCategory(name);
}
