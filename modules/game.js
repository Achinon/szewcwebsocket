// const GameData = class {
//     turnCounter = 0;
//     offsetCounter = 0;
//     players = new Map()

//     constructor(Player){
//         this.players.set(Players.socket.id, Players)
//     }

// }

const Game = {
    games: new Array(),
    joinGame(player){
        //zakładamy z góry, że gra jest zajęta
        let freeGame = false;
        for (const i in games) {
            //jeżeli jest = 2, to gra jest zajęta
            if(game[i].players.size != 2)
                freeGame = i;
        }
        //jeżeli nie zwróciło żadnego klucza to tworzy nowa grę
        if(!freeGame)
            return this.createGame(player)
        else {
            this.games[i].players.set(player.socket.id, player);
            return this.startGame();
        }
    },
    createGame(player){
        //obiekt przechowywany w this.games
        const game = {
            players: new Map(),
            addPlayer(){
                this.players.set(player.socket.id, player);
            }
        }
        return this.games.push(game);
    },
    startGame(game){
        
    }
}

// game{
//     isStarted,
//     players,
//     addPlayer
// }
//
//
//
//
//
