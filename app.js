const fs = require('fs'), https = require('http'), Games = require('./modules/game'), Player = require('./modules/player');
file = fs.readFileSync("test.html");

server = https.createServer((req, res) => {
    res.end(file)
});

const io = require('socket.io')(server, { allowEIO3: true });

io.on('connection', socket => {
    const player = new Player(socket);

    socket.on('joined the game', name => {
        player.nick = name;
        Games.join(player)
    });
})

server.listen(3000, _ => {
    console.log("Powitanie");
})
