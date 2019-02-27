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
var verticalPosition = 5;
var horisontalPosition = 250;


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
let waterTiles = document.getElementsByClassName("game-cell-water");


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
        if (verticalPosition >= 600) {
            winCondition()
        }
        frog.style.bottom = verticalPosition + "px";
    } else if (event.which === 40) {
        verticalPosition -= 50;
        if (verticalPosition <= -45) {
            verticalPosition += 50
        }
        frog.style.bottom = verticalPosition + "px";
    } else if (event.which === 37) {
        horisontalPosition += 50;
        if (horisontalPosition >= 550) {
            horisontalPosition -= 50
        }
        frog.style.right = horisontalPosition + "px";
    } else if (event.which === 39) {
        horisontalPosition -= 50;
        if (horisontalPosition <= -50) {
            horisontalPosition += 50
        }
        frog.style.right = horisontalPosition + "px";
    }
    console.log("moved");
    for (let water of waterTiles) {
        if (isCollapsed(frog, water)) {
            console.log("colliding");
            dieCondition()
        }
    }
}


function winCondition() {
    alert('WOHHOOO You successfully reached the swamp. Time for BREKK');
    verticalPosition = 5;
    horisontalPosition = 250;
    frog.style.right = horisontalPosition + "px";
}


document.onkeydown = move;


// ##################################################### COLLIDE #################################################### //


function dieCondition() {
    alert("PFFF! What kind of frog you are?! Can't you swim?! Nooob!");
    verticalPosition = 5;
    horisontalPosition = 250;
    frog.style.right = horisontalPosition + "px";
}


// var is_colliding = function( frog, waterElement ) {
// 	// Div 1 data
// 	var d1_offset             = frog.offset();
// 	var d1_height             = frog.outerHeight( true );
// 	var d1_width              = frog.outerWidth( true );
// 	var d1_distance_from_top  = d1_offset.top + d1_height;
// 	var d1_distance_from_left = d1_offset.left + d1_width;
//
// 	// Div 2 data
// 	var d2_offset             = waterElement.offset();
// 	var d2_height             = waterElement.outerHeight( true );
// 	var d2_width              = waterElement.outerWidth( true );
// 	var d2_distance_from_top  = d2_offset.top + d2_height;
// 	var d2_distance_from_left = d2_offset.left + d2_width;
//
// 	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );
//
// 	// Return whether it IS colliding
// 	return ! not_colliding;
// };


function isCollapsed(frog, deadlyObject){
    let object_1 = frog.getBoundingClientRect();
    let object_2 = deadlyObject.getBoundingClientRect();

    if (object_1.left < object_2.left + object_2.width  && object_1.left + object_1.width  > object_2.left &&
		object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
        return true
    }
    return false
}