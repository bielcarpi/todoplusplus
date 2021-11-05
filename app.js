var express = require("express");
var app = express();

//TODO: Change src folder to dist folder before production
var filesPath = '/src/';


//Serving static content with express middleware (dist directory)
app.use(express.static(filesPath));

app.get('/', (req, res) => {
    res.sendFile(__dirname + filesPath + 'index.html');
});

app.get('/todo-form', (req, res) => {
    res.sendFile(__dirname + filesPath + 'todo-form.html');
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 
