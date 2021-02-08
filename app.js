const server = require('express')(),
    https = require('https').createServer(server),
    io = require('socket.io')(https),
    Games = require('./modules/game');

// server(server.json());
https.listen(8080, () => console.log('Powitanie'));


io.on('connection', socket => {
    Games.find()

    socket.on('joined the game', json => {
        const player = new Player(json);
    });
})

