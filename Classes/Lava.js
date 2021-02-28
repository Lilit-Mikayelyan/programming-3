var LivingCreature = require("./LivingCreature")

module.exports = class Lava extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.life = 0;
    }

    mul() {
        this.life++;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1).concat(this.chooseCell(6))));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            let lava = new Lava(x, y);
            lavaArr.push(lava);
            this.life = 0;
        }
    }

    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1).concat(this.chooseCell(6))));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
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