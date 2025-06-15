let canvas;
// let ctx;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/mariachi.wav');

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('my charater is ', world.character)
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    // backgroundMusic.play();

}

function chickenMove() {
    world.enemies[0].moveRight(world.enemies[0], 2);
    // Hier kommt dein wiederholender Code hin
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    // console.log(e)
})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    // console.log(e)
})