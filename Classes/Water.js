var LivingCreature = require("./LivingCreature")

module.exports = class Water extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.life = 0;
    }

    mul() {
        this.life++;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1).concat(this.chooseCell(6))));
        if (newCell && this.life > 10) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let water = new Water(x, y);
            waterArr.push(water);
            this.life = 0;
        }
    }

    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1).concat(this.chooseCell(6))));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            for (let index = 0; index < grassArr.length; index++) {
                if (grassArr[index].x == x && grassArr[index].y == y) {
                    grassArr.splice(index, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
    }

}