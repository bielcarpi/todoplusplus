const express = require("express");
const config = require("./config");

const app = express();
const PORT = config.express.port;

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

app.get('/', (req, res) => {
    res.sendFile(staticFilesPath + 'index.html');
});

app.get('/todo-form', (req, res) => {
    res.sendFile(staticFilesPath + 'todo-form.html');
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
}); 
