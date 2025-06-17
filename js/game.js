let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/mariachi.wav');

function init() {
    initLevel();
    setupCanvasAndWorld();
    playBackgroundMusic();
    setupClickableArea();
}

function setupCanvasAndWorld() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('my character is', world.character);
}

function playBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
}

function setupClickableArea() {
    const area = getClickableArea();
    canvas.addEventListener('click', (e) => handleClick(e, area));
    drawClickableArea(area);
}

function getClickableArea() {
    return {
        width: 120,
        height: 100,
        x: 720 - 120,
        y: 480 - 100
    };
}

function handleClick(e, area) {
    const pos = getMousePos(e);
    if (isInsideArea(pos, area)) {
        alert('Klick unten rechts erkannt!');
        // Optional: world.character.doSomething();
    }
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function isInsideArea(pos, area) {
    return (
        pos.x >= area.x &&
        pos.x <= area.x + area.width &&
        pos.y >= area.y &&
        pos.y <= area.y + area.height
    );
}

function drawClickableArea(area) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,255,0,0.3)';
    ctx.fillRect(area.x, area.y, area.width, area.height);
}

function chickenMove() {
    world.enemies[0].moveRight(world.enemies[0], 2);
}

// Tasteneingaben
window.addEventListener("keydown", (e) => handleKey(e, true));
window.addEventListener("keyup", (e) => handleKey(e, false));

function handleKey(e, isDown) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = isDown; break;
        case 37: keyboard.LEFT = isDown; break;
        case 38: keyboard.UP = isDown; break;
        case 40: keyboard.DOWN = isDown; break;
        case 32: keyboard.SPACE = isDown; break;
        case 68: keyboard.D = isDown; break;
    }
}
