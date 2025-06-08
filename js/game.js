let canvas;
// let ctx;
let world;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log('my charater is ', world.character)


}

function chickenMove() {
    world.enemies[0].moveRight(world.enemies[0], 2);
    // Hier kommt dein wiederholender Code hin
}

// let intervallId = setInterval(chickenMove, 100);

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        world.character.moveRight(world.character, 5);
    }
    if (event.key === "ArrowLeft") {
        world.character.moveLeft(world.character, 5);
    }
});