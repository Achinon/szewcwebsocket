const server = require('express')(),
    http = require('http').createServer(server),
    io = require('socket.io')(http),
    Games = require('./modules/game');

//połączenia socketowe
http.listen(8080, err => {
    if(err)
        console.log(err);
    else{
        console.log('HTTPS running...')
    }
});
//połączenia webowe 
server.listen(process.env.PORT || 80, err => {
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