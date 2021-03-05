var sideLength = 20;
var numberOfSides = 40;

var socket = io();

socket.on('matrixUpdate', drawMatrix);

function setup() {
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength);
    background('#acacac');
}

function drawMatrix(data) {
    var matrix = data.matrix;
    var weather = data.weather;
    console.log(matrix);

    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {

            if (matrix[y][x] == 1) {
                if (weather == "summer") {
                    fill("green")
                } else {
                    fill("white")
                }
                
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
            else if (matrix[y][x] == 7) {
                fill('orange')
            }
            else {
                fill('grey')
            }
            rect(x * sideLength, y * sideLength, sideLength, sideLength)
        }
    }
}

function lavaClick(){
    socket.emit("lava");
}