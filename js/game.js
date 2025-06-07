let canvas;
// let ctx;
let world;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log('my charater is ', world.character)

    KeyboardEvent.charCode

    // ctx = canvas.getContext('2d')

    // character.src = '../img/2_character_pepe/2_walk/W-21.png'
    // ctx.drawImage(character,20,20,50,150)

    // ctx.drawImage(world.character.img,world.character.x,world.character.y,50, 150)

}

function chickenMove() {
    world.enemies[0].moveRight(world.enemies[0],2);
    // Hier kommt dein wiederholender Code hin
}

let intervallId = setInterval(chickenMove, 100);

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        world.character.moveRight(world.character,5);
    }
    if (event.key === "ArrowLeft") {
        world.character.moveLeft(world.character,5);
    }
});