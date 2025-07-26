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
 * Sets up outro screen
 * 
 * @param {boolean} isWin - Whether player won
 */
function setupOutro(isWin) {
    toggleClass("outro", "hidden", false);
    toggleClass("youWinImg", "hidden", !isWin);
    toggleClass("youLoseImg", "hidden", isWin);
    toggleClass("outroBtnDiv", "hidden", false);

    if (isWin) world.endbossDead = true;
    else world.characterDead = true;
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
 * Toggles impressum visibility
 * 
 */
function impressum() {
    toggleClass("impressum", 'hidden');
}

/**
 * Opens tutorial and pauses game if running
 * 
 */
function openTutorial() {
    const wasPaused = isPaused;

    if (gameStarted && !isPaused) {
        pauseGame();
    }

    if (gameStarted && !wasPaused) {
        window.tutorialFromRunningGame = true;
    }

    toggleClass("tutorial", 'hidden');
}

/**
 * Closes tutorial - game stays paused if opened during gameplay
 * 
 */
function closeTutorial() {
    toggleClass("tutorial", 'hidden');
}

/**
 * Original tutorial function - only toggles visibility
 * 
 */
function tutorial() {
    toggleClass("tutorial", 'hidden');
}

function setupModalListeners() {
    const modals = ['impressum', 'tutorial'];
    const closeButtons = ['impressumClose', 'tutorialClose'];

    modals.forEach((modalId, index) => {
        document.getElementById(modalId).addEventListener('click', (event) => {
            if (event.target.id === modalId) {
                if (modalId === 'tutorial') {
                    closeTutorial();
                } else {
                    toggleClass(modalId, 'hidden');
                }
            }
        });

        document.getElementById(closeButtons[index]).addEventListener('click', () => {
            if (modalId === 'tutorial') {
                closeTutorial();
            } else {
                toggleClass(modalId, 'hidden');
            }
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