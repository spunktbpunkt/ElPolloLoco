let canvas;
// let ctx;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/mariachi.wav');

function init() {
    initLevel();
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
    // console.log(e.keyCode)
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

    if (e.keyCode == 68) {
        keyboard.D = true;
        // console.log('Ddown')
    }

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

    if (e.keyCode == 68) {
        keyboard.D = false;
        // console.log('Dup')
    }
    
})