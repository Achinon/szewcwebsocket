const server = require('express')(),
    http = require('http').createServer(server),
    io = require('socket.io')(http);

server(json());

io.on('connection', socket => {
    Game.find()

    io.on('joined the game', json => {
        const player = new Player(json);
    });
})

