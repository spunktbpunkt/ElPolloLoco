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
    playBackgroundMusic();

}

function setupCanvasAndWorld() {
    canvas = document.getElementById("canvas");
    const level = createLevel(); // jetzt als Funktion aufgerufen
    world = new World(canvas, keyboard, level);
}

function showGame() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("outro").classList.remove("outro");
    document.getElementById("canvasDiv").classList.remove("hidden");
}

function playBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = backgroundMusicVolume;
    backgroundMusic.play();
}

function pauseGame() {
    if (!gameStarted) return;

    let iconImg = document.getElementById("extraIcon");
    if (isPaused) {
        isPaused = false
        world.draw();
        iconImg.src = "img/icon/pause-icon.svg"
        togglePlayback(true);
    } else {
        isPaused = true
        iconImg.src = "img/icon/play-icon.svg"
        togglePlayback(false);
    };
}

function youWin() {
    document.getElementById("outro").classList.remove("hidden");
    document.getElementById("youWinImg").classList.remove("hidden");
    document.getElementById("youLoseImg").classList.add("hidden");
    document.getElementById("outroBtnDiv").classList.remove("hidden");
    isPaused = false;
}

function youLose() {
    document.getElementById("outro").classList.remove("hidden");
    document.getElementById("youWinImg").classList.add("hidden");
    document.getElementById("youLoseImg").classList.remove("hidden");
    document.getElementById("outroBtnDiv").classList.remove("hidden");
    isPaused = false;
}

function togglePlayback(element) {
    if (element) {
        backgroundMusic.play();
    }
    else {
        backgroundMusic.pause();
    }
}

function startPage() {
    gameStarted = !gameStarted
    backgroundMusic.pause();
    document.getElementById("intro").classList.toggle("hidden");
    document.getElementById("outro").classList.add("hidden");
    document.getElementById("canvasDiv").classList.remove("hidden");
    document.getElementById("extraIcon").src = "img/icon/info-icon.svg"
    
}

function toggleMusic() {
    musicMuted = !musicMuted;
    backgroundMusic.volume = musicMuted ? 0 : backgroundMusicVolume;
}

function toggleSound() {
    soundMuted = !soundMuted;
    world.character.walking_sound.volume = soundMuted ? 0 : soundVolume;
    muteAllSounds(soundMuted);
}

function muteAllSounds(isMuted) {
    if (world.character) {
        world.character.sounds.forEach(sound => {
            sound.volume = isMuted ? 0 : soundVolume; // oder individuelle Lautstärke
        });
    }
}

function changeMusic(name) {
    const musicIcon = document.getElementById(name)
    if (musicIcon.src.includes('no')) {
        musicIcon.src = "img/icon/music-icon.svg"
        localStorage.setItem('music','true')
    } else {
        musicIcon.src = "img/icon/no-music-icon.svg"
        localStorage.setItem('music','false')
    }
    toggleMusic();
}

function changeSound(name) {
    const soundIcon = document.getElementById(name)
    if (soundIcon.src.includes('no')) {
        soundIcon.src = "img/icon/sound-icon.svg"
        localStorage.setItem('sound','true')
    } else {
        soundIcon.src = "img/icon/no-sound-icon.svg"
        localStorage.setItem('sound','false')
    }
    toggleSound();
}

function changeScreen(name) {
    const screenIcon = document.getElementById(name)
    if (screenIcon.src.includes('full')) {
        screenIcon.src = "img/icon/minimizescreen-icon.svg"
    } else {
        screenIcon.src = "img/icon/fullscreen-icon.svg"
    }
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
