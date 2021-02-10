let matrix = [];
let side = 10;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let waterArr = [];
let hunterArr = [];
let flowerArr = [];

function setup() {
    matrixGenerator(80, 1500, 100, 60, 2, 60, 20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('grey');
    frameRate(10);

    noStroke()

    function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, hunterCount, flowerCount) {
        for (let index = 0; index < matrixSize; index++) {
            matrix[index] = [];
            for (let i = 0; i < matrixSize; i++) {
                matrix[index][i] = 0;
            }
        }
        for (let index = 0; index < grassCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 1;
        }
        for (let index = 0; index < grassEaterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 2;
        }
        for (let index = 0; index < predatorCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 3;
        }
        for (let index = 0; index < waterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 4;
        }
        for (let index = 0; index < hunterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 5;
        }
        for (let index = 0; index < flowerCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 6;
        }
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let water = new Water(x, y);
                waterArr.push(water);
            }
            else if (matrix[y][x] == 5) {
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            }
            else if (matrix[y][x] == 6) {
                let flower = new Flower(x, y);
                flowerArr.push(flower);
            }
        }
    }

}

function draw() {

    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {

            if (matrix[y][x] == 1) {
                fill('green')
            }
            else if (matrix[y][x] == 2) {
                fill('yellow')
            }
            else if (matrix[y][x] == 3) {
                fill('red')
            }
            else if (matrix[y][x] == 4) {
                fill('lightblue')
            }
            else if (matrix[y][x] == 5) {
                fill('black')
            }
            else if (matrix[y][x] == 6) {
                fill('pink')
            }
            else {
                fill('grey')
            }
            rect(x * side, y * side, side, side)
        }
    }
    for (let index = 0; index < grassArr.length; index++) {
        grassArr[index].mul();
    }
    for (let index = 0; index < grassEaterArr.length; index++) {
        grassEaterArr[index].eat();
    }
    for (let index = 0; index < predatorArr.length; index++) {
        predatorArr[index].eat();
    }
    for (let index = 0; index < waterArr.length; index++) {
        waterArr[index].mul();
    }
    for (let index = 0; index < hunterArr.length; index++) {
        hunterArr[index].eat();
    }
    for (let index = 0; index < flowerArr.length; index++) {
        flowerArr[index].move();
    }
}

