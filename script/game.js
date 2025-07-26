let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let gameStarted = false;

/**
 * Initializes app with saved settings
 * 
 */
function initNew() {
    getLocalStorage();
    setIconSrc('musicIcon', localStorageMusic == 'true' ? "img/icon/music-icon.svg" : "img/icon/no-music-icon.svg");
    setIconSrc('soundIcon', localStorageSound == 'true' ? "img/icon/sound-icon.svg" : "img/icon/no-sound-icon.svg");
    musicMuted = localStorageMusic !== 'true';
    soundMuted = localStorageSound !== 'true';
}

/**
 * Initializes the game
 * 
 */
function init() {
    getLocalStorage();
    initGameState();
    setupUI();
    setupCanvasAndWorld();
    resetOutro();
    if (localStorageMusic == 'true') {
        playBackgroundMusic();
    }
    setupTouchControls();
}

/**
 * Resets outro elements to hidden state
 * 
 */
function resetOutroElements() {
    const outro = document.getElementById('outro');
    const elements = ['outro', 'youWinImg', 'youLoseImg', 'outroBtnDiv'];
    elements.forEach(id => toggleClass(id, 'hidden', true));

    outro.style.display = 'none';
}

/**
 * Sets initial game state
 * 
 */
function initGameState() {
    gameStarted = true;
    isPaused = false;
    world = null;
}

/**
 * Creates canvas and world objects
 * 
 */
function setupCanvasAndWorld() {
    canvas = document.getElementById("canvas");
    const level = createLevel();
    world = new World(canvas, keyboard, level);
    world.gameEnd = false;
    world.characterDead = false;
    world.endbossDead = false;
}

/**
 * Toggles game pause state
 * 
 */
function pauseGame() {
    if (!gameStarted) return;
    isPaused = !isPaused;
    const iconSrc = isPaused ? "img/icon/play-icon.svg" : "img/icon/pause-icon.svg";
    setIconSrc("pauseIcon", iconSrc);
    toggleClass('pauseDiv', 'hidden', !isPaused);
    if (isPaused) {
        togglePlayback(false);
        if (world && world.character) world.character.stopSnorring();
        stopAllAudio();
    } else {
        if (!musicMuted) togglePlayback(true);
    }
    if (!isPaused) world.draw();
}

/**
 * Handles game end logic
 * 
 * @param {boolean} isWin - Whether player won
 */
function endGame(isWin) {
    if (world && world.gameEnd) return;
    stopGame();
    setupOutro(isWin);
    playEndSound(isWin);
}

/**
 * Stops all game processes
 * 
 */
function stopGame() {
    if (world) {
        world.gameEnd = true;
        isPaused = false;

        if (world.worldInterval) clearInterval(world.worldInterval);
        if (world.character) world.character.stopAllIntervals();

        clearProjectiles()
        stopAllAudio();
    }
    backgroundMusic.pause();
}

function clearProjectiles() {
    if (world.endbossProjectiles) {
        world.endbossProjectiles.forEach(projectile => {
            projectile.destroy();
        });
        world.endbossProjectiles = [];
    }
}

/**
 * Triggers win state
 * 
 */
function youWin() {
    endGame(true);
}

/**
 * Triggers lose state
 * 
 */
function youLose() {
    endGame(false);
}

/**
 * Returns to start page
 * 
 */
function startPage() {
    resetGameState();
    setupStartPageUI();
    resetOutroElements();
}

/**
 * Resets game state variables
 * 
 */
function resetGameState() {
    gameStarted = false;
    world = null;
    backgroundMusic.pause();
}

/**
 * Changes music setting and icon
 * 
 * @param {string} name - Icon element ID
 */
function changeMusic(name) {
    const musicIcon = document.getElementById(name);
    const isNoMusic = musicIcon.src.includes('no');

    setIconSrc(name, isNoMusic ? "img/icon/music-icon.svg" : "img/icon/no-music-icon.svg");
    localStorage.setItem('music', isNoMusic ? 'true' : 'false');
    toggleMusic();
}

