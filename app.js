const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const fs = require('fs');
const e = require("express");

const PORT = config.express.port;
const app = express();
app.disable('x-powered-by');

let staticFilesPath = '';
if(process.argv.length < 3){ //If there is no cli argument, we'll assume we're in a normal build (the static files path is dist)
    staticFilesPath = __dirname + '/dist/'; 
}
else{
    if(process.argv.length == 3 && process.argv[2] === 'dev'){
        staticFilesPath = __dirname + '/src/'; // If the 'dev' (development option) argument is introduced, we'll asume we're in a development build (the static files path is src)
    }
    else{
        console.log("Error. The following argument is not recognized");
        return 1;
    }
}


//Serving static content with express middleware (dist directory)
app.use(express.static(staticFilesPath));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(staticFilesPath + 'index.html');
});
app.get('/todo-form', (req, res) => {
    res.sendFile(staticFilesPath + 'todo-form.html');
});
app.get('/list-categories', (req, res) => {
    //TODO: Llegir fitxer categories i retornar-les en format json
});
app.get('/list-tasks', (req, res) => {
    //TODO: Llegit fitxer tasques i retornar-les en format json
});


app.post('/add-category', (req, res) => {
    //The categories file will follow the following format:
    //name_of_category
    //color_of_category
    //
    //name_of_category
    //...
   if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('color')){
    let category = req.body.name + '\n' + req.body.color + '\n\n';
    fs.appendFileSync('app_files/categories.txt', category);
    res.redirect('/');
   }
   else{
       res.send('Bad Request');
   }
});
app.post('/remove-category', (req, res) => {
    //The categories file will follow the following format:
    //name_of_category
    //color_of_category
    //
    //name_of_category
    //...
    req.body.name = 'miscellaneous';
    console.log(req.body);

    if(req.body.hasOwnProperty('name')){
        let targetCategoryName = req.body.name;
        //Parse all categories, delete category we want to delete and rewrite
        let categoryData = fs.readFileSync('app_files/categories.txt', 'utf8');
        let categoryArray = categoryData.split('\n\n'); //Split all categories
        let categoryToRemove = -1;

        //Search for the index of the category we want to remove
        for(let i = 0; i < categoryArray.length; i++){
            let currentCategoryName = categoryArray[i].split('\n')[0];
            if(currentCategoryName === targetCategoryName)
                categoryToRemove = i;
        }

        //If we haven't found a category to remove (the name of the category provided doesn't exist in the file)
        if(categoryToRemove == -1){
            res.send('Unable to remove category. ' + targetCategoryName + ' is not a valid category to delete');
        }
        else{ //If we have found a category to remove
            console.log(categoryArray);
            categoryArray.splice(categoryToRemove, 1); //Remove from the categories array the category we want to delete
            console.log(categoryArray);
            let categoriesString = '';
            for(let i = 0; i < categoryArray.length; i++)
                categoriesString += (categoryArray[i] + '\n\n');

            fs.unlinkSync('app_files/categories.txt');
            fs.writeFileSync('app_files/categories.txt', categoriesString);
            res.sendStatus(204); //HTTP 204 tells the browser that the request has been processed and reteurns nothing
        }
    }
    else{
        res.send('Bad Request');
    }
});
app.post('/add-task', (req, res) => {
    //The tasks file will follow the following format:
    //title_of_task
    //img_route
    //deadline_of_task
    //category1, category2, ..., categoryN (null if there isn't a category)
    //description
    //done? (yes or no)
    //
    //title_of_task
    //...

    let task = req.body.title + '\n' + req.body.img_route + '\n' + 
        req.body.deadline + '\n'+ req.body.category + '\n' + 
        req.body.description + '\n' + req.body.done + '\n\n';
    
    fs.appendFileSync('app_files/tasks.txt', task);
    res.sendStatus(204); //HTTP 204 tells the browser that the request has been processed and reteurns nothing
});
app.post('/remove-task', (req,res) => {
    //The tasks file will follow the following format:
    //title_of_task
    //img_route
    //deadline_of_task
    //category1, category2, ..., categoryN (null if there isn't a category)
    //description
    //done? (yes or no)
    //
    //title_of_task
    //...

    let taskTitle = req.body.title;
    res.sendStatus(204); //HTTP 204 tells the browser that the request has been processed and reteurns nothing
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
}); 
