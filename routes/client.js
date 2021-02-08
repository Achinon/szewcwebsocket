const Router = require('express').Router(),
    fs = require('fs');

let filePath = '';

fs.readFile('./example_client_path.txt', 'utf8', (err, data) => {
    if(err)
        console.log(err)
    else{
        console.log(data);
        filePath = data;
    }
});

Router.get('/', (req, res, next) => {
    res.sendFile(filePath);
});

module.exports = Router;