var LivingCreature = require("./LivingCreature")

module.exports = class Flower extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 30;

    }
    chooseCell(char) {
        this.getNewDirections;
        return super.chooseCell(char);

    }
    
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let flower = new Flower(x, y);
            flowerArr.push(flower);
            this.energy = 0;
        }
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }

    }
}