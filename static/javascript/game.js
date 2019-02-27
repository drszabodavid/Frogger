// document.getElementById("myButton").onclick = function () {
//     location.href = "game";
// };

let createCell = function(classname){
    return `<div class="${classname}"></div>`;
};

const grassElement = createCell('game-cell-grass');
const swampElement = createCell('game-cell-swamp');
const waterElement = createCell('game-cell-water');
const shoreElement = createCell('game-cell-shore');
const sideRoadElement = createCell('game-cell-road');
const MainRoadElement = createCell('game-cell-road2');
const frog = document.getElementById('frog');
const ThreeLongLog = document.getElementById('ThreeLongLog');
const gameField = document.getElementById('game-field');
var verticalPosition = 55;
var horisontalPosition = 300;


function createMapRow(type, length, j) {
    for (let i = 0; i < length; i++) {
        document.querySelector(`#row${j}`).innerHTML += type;
    }
}

function createUpperRow(length) {
    for (let i = 1; i < length+1; i++) {
         if (i % 2 === 0) {
          document.getElementById('upperRow').innerHTML += swampElement;
         }
        if (i % 2 === 1) {
          document.getElementById('upperRow').innerHTML += grassElement;
         }
    }
}

function createMap () {

    createUpperRow(11);
    for (let j = 0; j < 5; j++) {
        createMapRow(waterElement, 11, j);
    }
    for (let j = 6; j < 7; j++) {
        createMapRow(shoreElement, 11, j);
    }
    for (let j = 7; j < 8; j++) {
        createMapRow(sideRoadElement, 11, j);
    }
    for (let j = 8; j < 10; j++) {
        createMapRow(MainRoadElement, 11, j);
    }
    for (let j = 10; j < 11; j++) {
        createMapRow(sideRoadElement, 11, j);
    }
    for (let j = 11; j < 12; j++) {
        createMapRow(shoreElement, 11, j);
    }
}

function LogMove(logname, startposition, speed) {
  var elem = document.getElementById(logname);
  var pos = startposition;
  var id = setInterval(frame, speed);
  function frame() {
    if (pos === 550) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.right = pos + "px";
      if (pos === 550)
          LogMove(logname, startposition, speed)
    }
  }
}

function LogMoveReversed(logname, startposition, speed) {
  var elem = document.getElementById(logname);
  var pos = startposition;
  var id = setInterval(frame, speed);
  function frame() {
    if (pos === 700) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.left = pos + "px";
      if (pos === 700)
          LogMoveReversed(logname, startposition, speed)
    }
  }
}

createMap();



LogMove("ThreeLongLog", -900, 12);
LogMove("ThreeLongLog2", -450, 12);
LogMove("ThreeLongLog3", -200, 12);
LogMove("FourLongLog", -200, 15, );
LogMove("FourLongLog2", -700, 15, );
LogMoveReversed("ThreeLongLogReversed", -300, 10)
LogMoveReversed("ThreeLongLogReversed2", -600, 10)


function move(event) {
    if (event.which === 38) {
        verticalPosition += 50;
        if (verticalPosition >= 650) {
            verticalPosition -= 50
        }
        frog.style.bottom = verticalPosition + "px";
    }
    else if (event.which === 40) {
        verticalPosition -= 50;
        if (verticalPosition <= 5) {
            verticalPosition += 50
        }
        frog.style.bottom = verticalPosition + "px";
    }
    else if (event.which === 37) {
        horisontalPosition+= 50;
        if (horisontalPosition >= 600) {
            horisontalPosition -= 50
        }
        frog.style.right = horisontalPosition + "px";
    }
    else if (event.which === 39) {
        horisontalPosition-= 50;
        if (horisontalPosition <= 0) {
            horisontalPosition += 50
        }
        frog.style.right = horisontalPosition + "px";
    }
}


document.onkeydown = move;


var h1 = document.getElementsByTagName('h1')[0],
//    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
        }
    }

    h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "0") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();





