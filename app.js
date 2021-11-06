const express = require("express");
const config = require("./config");

const app = express();
const PORT = config.express.port;
const staticFilesPath = __dirname + '/' + config.express.staticFilesPath; 


//Serving static content with express middleware (dist directory)
app.use(express.static(staticFilesPath));

app.get('/', (req, res) => {
    res.sendFile(filesPath + 'index.html');
});

app.get('/todo-form', (req, res) => {
    res.sendFile(filesPath + 'todo-form.html');
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
}); 
