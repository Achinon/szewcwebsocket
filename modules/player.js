const Player = class {
    points = 0;
    nick = null;
    color = null;


    constructor(socket){
        this.socket = socket;
    }
}

module.exports = Player