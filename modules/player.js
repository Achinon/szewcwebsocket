const Player = class {
    points = 0;

    constructor(nick, color, socket){
        this.nick = nick;
        this.color = color;
        this.socket = socket;
    }
}