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
var verticalPosition = 0;
var horisontalPosition = 250;
var died = false;


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

function ElementMove(logname, startposition, speed) {
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
                ElementMove(logname, startposition, speed)
        }
    }
}


function ElementMoveReversed(logname, startposition, speed) {
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
                ElementMoveReversed(logname, startposition, speed)
        }
    }
}

createMap();
let waterTiles = document.getElementsByClassName("game-cell-water");
let logTiles = document.getElementsByClassName("log");
let carTiles = document.getElementsByClassName("car");


ElementMove("ThreeLongLog", -900, 12);
ElementMove("ThreeLongLog2", -450, 12);
ElementMove("ThreeLongLog3", -200, 12);
ElementMove("FourLongLog", -200, 15, );
ElementMove("FourLongLog2", -700, 15, );
ElementMoveReversed("ThreeLongLogReversed", -300, 10);
ElementMoveReversed("ThreeLongLogReversed2", -450, 10);
ElementMoveReversed("ThreeLongLogReversed7", -450, 10);
ElementMoveReversed("ThreeLongLogReversed3", -200, 10);
ElementMoveReversed("ThreeLongLogReversed4", -450, 10);
ElementMoveReversed("ThreeLongLogReversed5", -800, 10);
ElementMoveReversed("ThreeLongLogReversed6", -1000, 10);
ElementMoveReversed("FourLongLog4", -500, 20);
ElementMoveReversed("FourLongLog5", -200, 20);
ElementMoveReversed("truckCar", -200, 15);
ElementMoveReversed("fireCar", -300, 10);
ElementMove("greenCar", -700, -3);
ElementMoveReversed("blueCarReversed", -100, 10);
ElementMove("yellowCar", -300, 3);


function move(event) {
    if (event.which === 38) {
        verticalPosition += 50;
        if (verticalPosition >= 600) {
            verticalPosition -= 50
        }
        frog.style.bottom = verticalPosition + "px";
        frog.style.transform = "rotate(0deg)";
    }
    else if (event.which === 40) {
        verticalPosition -= 50;
        if (verticalPosition <= -50) {
            verticalPosition += 50
        }
        frog.style.bottom = verticalPosition + "px";
        frog.style.transform = "rotate(180deg)";
    }
    else if (event.which === 37) {
        horisontalPosition+= 50;
        if (horisontalPosition >= 550) {
            horisontalPosition -= 50
        }
        frog.style.right = horisontalPosition + "px";
        frog.style.transform = "rotate(-90deg)";
    }
    else if (event.which === 39) {
        horisontalPosition-= 50;
        if (horisontalPosition <= -50) {
            horisontalPosition += 50
        }
        frog.style.right = horisontalPosition + "px";
        frog.style.transform = "rotate(90deg)";
    }
    for (let water of waterTiles) {
        if (isCollapsed(frog, water)) {
            died = true;
            break
        }
    }
    for (let log of logTiles) {
        if (isCollapsed(frog, log)) {
            died = false;
            break
        }
    }
    if (died) {
        dieCondition();
        died = false;
    }
}


function winCondition() {
    alert('WOHHOOO You successfully reached the swamp. Time for BREKK');
    verticalPosition = 0;
    horisontalPosition = 250;
    frog.style.right = horisontalPosition + "px";
    frog.style.bottom = verticalPosition + "px";
}


document.onkeydown = move;


function dieCondition() {
    alert("You died");
    verticalPosition = 0;
    horisontalPosition = 250;
    frog.style.right = horisontalPosition + "px";
    frog.style.bottom = verticalPosition + "px";
}


function carCrashCheck() {
    setTimeout(function () {
        for (let car of carTiles) {
            if (isCollapsed(frog, car)) {
                died = true;
                break
            }
        }
        if (died) {
            dieCondition();
            died = false;
        }
        carCrashCheck();
    }, 500)
}


function isCollapsed(frog, deadlyObject){
    let object_1 = frog.getBoundingClientRect();
    let object_2 = deadlyObject.getBoundingClientRect();

    if (object_1.left < object_2.left + object_2.width  && object_1.left + object_1.width  > object_2.left &&
		object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
        return true
    }
    return false
}


carCrashCheck();


var id;

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    id=ev.target
}

function drop(ev) {
    ev.target.append(document.getElementById(id));
}