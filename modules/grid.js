const Line = require('./line')
const Cell = require('./cell')

const Grid = class {
    constructor(){
        this.vertical = []
        for(let i = 0; i < 4; ++i) {
            this.vertical.push(new Line());
        }
        this.horizontal = []
        for(let i = 0; i < 4; ++i) {
            this.horizontal.push(new Line());
        }
        this.cells = []
        for(let i = 0; i < 9; ++i) {
            this.cells.push(new Cell());
        }
    }
}

module.exports = Grid