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
            colors: [-16776961, -65536, -256, -16711936],
            points: 0,
            addPlayer(player){
                player.color = this.colors[this.players.size]
                player.socket.emit('color', player.color)
                this.players.set(player.socket.id, player);
            },
            sendToPlayers(type, data) {
                for (const [key, player] of this.players) {
                    player.socket.emit(type, data);
                }
            },
            checkEnd(grid) {
                return (
                    grid.vertical
                        .map(({ owner }) => owner)
                        .every((owner) => owner !== null) &&
                    grid.horizontal
                        .map(({ owner }) => owner)
                        .every((owner) => owner !== null)
                );
            },
        }
        game.addPlayer(player);
        this.games.push(game);
        return game;
    },
    calculateClosedCells(game, currentPlayerIndex) {
        const gridSize = 3;
        const vertical = game.grid.vertical
        const horizontal = game.grid.horizontal
        let doubleCellPlayer = null
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (vertical[i * gridSize + j].owner == null || vertical[(i + 1) * gridSize + j].owner == null ||
                    horizontal[j * gridSize + i].owner == null || horizontal[(j + 1) * gridSize + i].owner == null
                ) continue

                if (game.grid.cells[i * gridSize + j].owner == null) {
                    if (doubleCellPlayer == null) {
                        game.offsetCounter += game.players.size - 1
                        const player = game.players.get(currentPlayerIndex)
                        game.grid.cells[i * gridSize + j].owner = player
                        player.points++
                        doubleCellPlayer = player
                    } else {
                        game.grid.cells[i * gridSize + j].owner = doubleCellPlayer
                        doubleCellPlayer.points++
                    }
                }
            }
        }
    },
    start(game){
        console.log('game started');
        for (const [key, player] of game.players) {
            player.socket.on("move", data => {
                const [d, v] = data.split(';')
                const direction = parseInt(d);
                const value = parseInt(v);
                if (direction !== null && value !== null && (value >= 0 && value <= 11)) {
                    if (direction === 0) {
                        const line = game.grid.vertical[value]
                        if (line.owner === null) {
                            line.owner = player
                            this.calculateClosedCells(game, key)
                            game.sendToPlayers("move", data)
                        } else {
                            console.log("line occupied")
                            player.socket.emit("line occupied")
                        }
                    } else if (direction === 1) {
                        const line = game.grid.horizontal[value]
                        if (line.owner === null ) {
                            line.owner = player
                            this.calculateClosedCells(game, key)
                            game.sendToPlayers("move", data)
                        } else {
                            console.log("line occupied")
                            player.socket.emit("line occupied")
                        }
                    } else {
                        console.log("Wrong move")
                        player.socket.emit("wrong move")
                    }
                } else {
                    console.log("Wrong move")
                    player.socket.emit("wrong move")
                }
                if(game.checkEnd(game.grid)) {
                    this.end(game)
                }
            });
            player.socket.on("disconnect", e => {
                for (const [key, player] of game.players) {
                    player.socket.disconnect()
                }
                console.error("Błąd")
                this.end(game);
            });
        }
        players = []
        game.players.forEach((key, player) => {
            players.push({ nick: key.nick, color: key.color });
        })

        game.sendToPlayers("start", JSON.stringify(players))
        //this.games.splice(this.games.indexOf(game), 1);
        //jakaś logika związana z ruszeniem z kopyta gry
        return game;
    },
    end(game) {
        game.sendToPlayers("end", null);
        console.log("END");
    },
}

module.exports = Games;