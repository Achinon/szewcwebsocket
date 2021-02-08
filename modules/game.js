const Games = {
    games: new Array(),
    join(player){
        //zakładamy z góry, że gra jest zajęta
        let freeGame = false;
        for (const i in games) {
            //jeżeli jest = 2, to gra jest zajęta
            if(game[i].players.size != 2)
                freeGame = game[i];
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
            addPlayer(player){
                this.players.set(player.socket.id, player);
            }
        }
        this.games.push(game);

        return game;
    },
    start(game){
        //jakaś logika związana z ruszeniem z kopyta gry
        return game;
    }
}

module.exports = Games;