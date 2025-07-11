let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/mariachi.wav');
let backgroundMusicVolume = 1;
let soundVolume = 1;
let musicMuted = false;
let soundMuted = false;
let isPaused = false;
let gameStarted = false;

function init() {
    document.getElementById("extraIcon").src = "img/icon/pause-icon.svg";
    gameStarted = true;
    showGame();
    setupCanvasAndWorld();
}

function setupCanvasAndWorld(){
    canvas = document.getElementById("canvas");
    const level = createLevel(); // jetzt als Funktion aufgerufen
    world = new World(canvas, keyboard, level);
}

function showGame() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("outro").classList.remove("outro");
    document.getElementById("canvasDiv").classList.remove("hidden");
}




window.addEventListener("keydown", (event) => {
    if (event.keyCode === 39) keyboard.RIGHT = true;
    if (event.keyCode === 37) keyboard.LEFT = true;
    if (event.keyCode === 38) keyboard.UP = true;
    if (event.keyCode === 40) keyboard.DOWN = true;
    if (event.keyCode === 32) keyboard.SPACE = true;
    if (event.keyCode === 68) keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode === 39) keyboard.RIGHT = false;
    if (event.keyCode === 37) keyboard.LEFT = false;
    if (event.keyCode === 38) keyboard.UP = false;
    if (event.keyCode === 40) keyboard.DOWN = false;
    if (event.keyCode === 32) keyboard.SPACE = false;
    if (event.keyCode === 68) keyboard.D = false;
});
