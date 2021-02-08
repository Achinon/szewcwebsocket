const server = require('express')(),
    https = require('https').createServer(server),
    io = require('socket.io')(https),
    Games = require('./modules/game');

//połączenia socketowe
https.listen(8080, err => {
    if(err)
        console.log(err);
    else{
        console.log('HTTPS running...')
    }
});
//połączenia webowe 
server.listen(443, err => {
    if(err)
        console.log(err);
    else{
        console.log('Express running...')
    }
});

io.on('connection', socket => {
    socket.emit('connection established', 'Connected to socket.io...');

    socket.on('joined the game', json => {
        const player = new Player(json);
    });
})

server.use('/', require('./routes/index'));