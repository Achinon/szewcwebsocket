const Games = {
    games: [],
    join(player){
        //zakładamy z góry, że gra jest zajęta
        let freeGame = false;
        for (let i = 0; i<this.games.length; ++i) {
            //jeżeli jest = 2, to gra jest zajęta
            if(this.games[i].players.size !== 2)
                freeGame = this.games[i];
        }
        //jeżeli nie zwróciło żadnego klucza to tworzy nowa grę
        if(!freeGame)
            return this.create(player)
        //serwer zapełniony, gra startuje
        else {
            freeGame.addPlayer(player);
            return this.start(freeGame);
        }
    },
    create(player){
        //obiekt przechowywany w this.games
        const game = {
            players: new Map(),
            grid: new (require('./grid'))(),
            turn: 0,
            offsetTurn: 0,
            addPlayer(player){
                this.players.set(player.socket.id, player);
            },
            sendToPlayers(type, data) {
                for (const [key, player] of this.players) {
                    player.socket.emit(type, data);
                }
            },
            checkEnd(grid){
                console.log("trzeba napisać");
                return false;
            }
        }
        game.addPlayer(player);
        this.games.push(game);

        return game;
    },
    start(game){
        let i = 0;
        console.log('game started');
        for (const [key, player] of game.players) {
            player.color = i++;
            player.socket.on("move", data => {
                game.sendToPlayers("move", data)
                if(game.checkEnd(JSON.parse(data))) {
                    game.sendToPlayers("end", null);
                }
            });
        }
        players = []
        game.players.forEach((key, player) => {
            players.push({nick: key.nick, color: key.color, });
        })

        game.sendToPlayers("game started", JSON.stringify({grid: game.grid, players: players}))
        console.log(game.players.values())
        this.games.splice(this.games.indexOf(game), 1);
        //jakaś logika związana z ruszeniem z kopyta gry
        return game;
    }
}

module.exports = Games;