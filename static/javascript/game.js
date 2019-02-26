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
const frog = document.getElementById('frog')


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

createMap()



