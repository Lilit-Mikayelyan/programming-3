var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require("./Classes/Grass");
var GrassEater = require("./Classes/GrassEater");
var Predator = require("./Classes/Predator");
var Hunter = require("./Classes/Hunter");
var Flower = require("./Classes/Flower");
var Water = require("./Classes/Water");
var Lava = require("./Classes/Lava");

var weather = 'winter';
var stats = [];

matrix = [];

grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
flowerArr = [];
waterArr = [];
lavaArr = [];

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
   console.log('a user connected');


   socket.on('lava', function () {
      console.log('some event happened on server', lavaArr.length);
      let lavaArrlength = lavaArr.length;
      for (let index = 0; index < lavaArrlength; index++) {
         console.log("lava")
         lavaArr[index].mul();
      }
   });

   socket.on('disconnect', function () {
      console.log('user disconnected');
   });
});

getRandomInt = function (min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}

random = function (arr) {
   let randomIndex = Math.floor(Math.random() * arr.length);
   let randomElement = arr[randomIndex];
   return randomElement;
}

function start() {
   matrixGenerator(80, 1500, 100, 60, 2, 60, 20, 1);

   function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, hunterCount, flowerCount, lavaCount) {
      for (let index = 0; index < matrixSize; index++) {
         matrix[index] = [];
         for (let i = 0; i < matrixSize; i++) {
            matrix[index][i] = 0;
         }
      }
      for (let index = 0; index < grassCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 1;
      }
      for (let index = 0; index < grassEaterCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 2;
      }
      for (let index = 0; index < predatorCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 3;
      }
      for (let index = 0; index < waterCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 4;
      }
      for (let index = 0; index < hunterCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 5;
      }
      for (let index = 0; index < flowerCount; index++) {
         let x = Math.floor(getRandomInt(0, matrixSize));
         let y = Math.floor(getRandomInt(0, matrixSize));
         matrix[y][x] = 6;
      }
      for (let index = 0; index < lavaCount; index++) {
         let x = 0
         let y = 0
         matrix[y][x] = 7;
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
         else if (matrix[y][x] == 7) {
            let lava = new Lava(x, y);
            lavaArr.push(lava);
         }
      }
   }
}

function game() {
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


   var data = {
      'matrix': matrix,
      'weater': weather
   };

   io.sockets.emit('matrixUpdate', data);

   saveStats();
}

function saveStats() {
   var fileName = 'stats.json';
   var statsObject = {
      'grassCount': grassArr.length,
      'grassEaterCount': grassEaterArr.length,
      'predatorCount': predatorArr.length,
      'waterCount': waterArr.length,
      'flowerCount': flowerArr.length,
      'hunterCount': hunterArr.length,
      'lavaCount': lavaArr.length
   };

   stats.push(statsObject);
   fs.writeFileSync(fileName, JSON.stringify(stats, null, 4));
}


function weather() {
   for (let counter = 1; counter > 0; counter++) {
      if (counter % 4 < 5) {
         weather = "summer";
      } else {
         weather = "winter";
      }
   }
}

start();

setInterval(game, 800);