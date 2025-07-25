let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let gameStarted = false;


/**
 * Sets icon source for DOM element
 * 
 * 
 * @param {string} id - Element ID
 * @param {string} src - Icon source path
 */
function setIconSrc(id, src) {
    document.getElementById(id).src = src;
}

/**
 * Toggles CSS class on DOM element
 * 
 * @param {string} id - Element ID
 * @param {string} className - CSS class name
 * @param {boolean} [add] - Force add/remove class
 */
function toggleClass(id, className, add) {
    document.getElementById(id).classList.toggle(className, add);
}

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
 * Sets up UI elements for gameplay
 * 
 */
function setupUI() {
    toggleClass('pauseIcon', 'hidden', false);
    toggleClass('impressumIcon', 'hidden', true);
    showGame();
}

/**
 * Resets outro display style
 * 
 */
function resetOutro() {
    const outro = document.getElementById("outro");
    outro.style.display = '';
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
 * Shows game UI elements
 * 
 */
function showGame() {
    toggleClass("intro", "hidden", true);
    toggleClass("outro", "outro", false);
    toggleClass("canvasDiv", "hidden", false);
    toggleClass("gameplayBtnDiv", "visibilityNone", false);
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
        stopAllAudio();
    }
    backgroundMusic.pause();
}

/**
 * Sets up outro screen
 * 
 * @param {boolean} isWin - Whether player won
 */
function setupOutro(isWin) {
    const outro = document.getElementById("outro");
    const winImg = document.getElementById("youWinImg");
    const loseImg = document.getElementById("youLoseImg");
    const btnDiv = document.getElementById("outroBtnDiv");

    toggleClass("outro", "hidden", false);
    toggleClass("youWinImg", "hidden", !isWin);
    toggleClass("youLoseImg", "hidden", isWin);
    toggleClass("outroBtnDiv", "hidden", false);

    if (isWin) world.endbossDead = true;
    else world.characterDead = true;
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
 * Sets up start page UI
 * 
 */
function setupStartPageUI() {
    toggleClass('intro', 'hidden', false);
    toggleClass('canvasDiv', 'hidden', true);
    toggleClass('gameplayBtnDiv', 'visibilityNone', true);
    toggleClass('pauseIcon', 'hidden', true);
    toggleClass('impressumIcon', 'hidden', false);
    toggleClass('pauseDiv', 'hidden', true);
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

/**
 * Changes sound setting and icon
 * 
 * @param {string} name - Icon element ID
 */
function changeSound(name) {
    const soundIcon = document.getElementById(name);
    const isNoSound = soundIcon.src.includes('no');

    setIconSrc(name, isNoSound ? "img/icon/sound-icon.svg" : "img/icon/no-sound-icon.svg");
    localStorage.setItem('sound', isNoSound ? 'true' : 'false');

    if (!isNoSound) {
        stopAllAudio();
        if (world && world.character) {
            world.character.stopSnorring();
        }
    }

    toggleSound();
}

/**
 * Toggles fullscreen mode and resizes canvas
 * 
 * @param {string} name - Screen icon element ID
 */
function changeScreen(name) {
    const screenIcon = document.getElementById(name);
    const isFullscreen = screenIcon.src.includes('full');

    if (isFullscreen) {
        setIconSrc(name, "img/icon/minimizescreen-icon.svg");
        enterFullscreen(document.getElementById("fullscreen"));
        setTimeout(() => {
            resizeCanvasToFullscreen();
        }, 100);
    } else {
        setIconSrc(name, "img/icon/fullscreen-icon.svg");
        exitFullscreen();
        resetCanvasResolution();
    }
}

/**
 * Sets up touch controls for mobile
 * 
 */
function setupTouchControls() {
    const buttonImgs = document.querySelectorAll('#gameplayBtnDiv img');

    buttonImgs.forEach(img => {
        const key = img.dataset.key;
        if (!key) return;

        addTouchEvents(img, key);
    });
}

/**
 * Adds touch event listeners to button
 * 
 * @param {HTMLElement} img - Button image element
 * @param {string} key - Keyboard key name
 */
function addTouchEvents(img, key) {
    const setKey = (value) => () => keyboard[key] = value;
    const preventDefault = (e) => { e.preventDefault(); keyboard[key] = true; };

    img.addEventListener('mousedown', setKey(true));
    img.addEventListener('mouseup', setKey(false));
    img.addEventListener('touchstart', preventDefault);
    img.addEventListener('touchend', setKey(false));
}

/**
 * Toggles tutorial visibility
 * 
 */
function tutorial() {
    toggleClass("tutorial", 'hidden');
}

/**
 * Toggles impressum visibility
 * 
 */
function impressum() {
    toggleClass("impressum", 'hidden');
}

/**
 * Sets up modal click listeners
 * 
 */
function setupModalListeners() {
    const modals = ['impressum', 'tutorial'];
    const closeButtons = ['impressumClose', 'tutorialClose'];

    modals.forEach((modalId, index) => {
        document.getElementById(modalId).addEventListener('click', (event) => {
            if (event.target.id === modalId) {
                toggleClass(modalId, 'hidden');
            }
        });

        document.getElementById(closeButtons[index]).addEventListener('click', () => {
            toggleClass(modalId, 'hidden');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupModalListeners);

const keyMappings = {
    39: 'RIGHT', 37: 'LEFT', 38: 'UP',
    40: 'DOWN', 32: 'SPACE', 68: 'D'
};

/**
 * Handles keyboard events
 * 
 * @param {KeyboardEvent} event - Keyboard event
 * @param {boolean} value - Key pressed state
 */
function handleKeyEvent(event, value) {
    const key = keyMappings[event.keyCode];
    if (key) keyboard[key] = value;
}

window.addEventListener("keydown", (event) => handleKeyEvent(event, true));
window.addEventListener("keyup", (event) => handleKeyEvent(event, false));