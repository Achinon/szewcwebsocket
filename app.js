const server = require('express')(),
    http = require('http').createServer(server),
    io = require('socket.io')(http),
    Games = require('./modules/game');

//heroku lub sobie zmieniać ten port i musi być ta zmienna do tego
http.listen(process.env.PORT || 8080, err => {
    if(err)
        console.log(err);
    else{
        console.log('HTTPS running...')
    }
});

io.on('connection', socket => {
    socket.emit('connection established', 'Connected to socket.io...');

    socket.on('joined the game', json => {
        const player = new Player(json);
    });
})

server.use('/', require('./routes/index'));