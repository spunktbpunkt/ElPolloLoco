let backgroundMusic = new Audio('audio/mariachi.wav');
let backgroundMusicVolume = 0.5;
let soundVolume = 1;
let musicMuted = false;
let soundMuted = false;

/**
 * Starts background music playback
 * 
 */
function playBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = backgroundMusicVolume;
    backgroundMusic.play();
}

/**
 * Plays end game sound
 * 
 * @param {boolean} isWin - Whether player won
 */
function playEndSound(isWin) {
    if (isWin) {
        let applause = new Audio('audio/applause.mp3');
        applause.play();
    }
}

/**
 * Stops all audio elements
 * 
 */
function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

/**
 * Toggles music on/off
 * 
 */
function toggleMusic() {
    musicMuted = !musicMuted;
    if (backgroundMusic.volume = musicMuted) {
        0
        backgroundMusic.pause()
    } else {
        backgroundMusicVolume;
        if (gameStarted) playBackgroundMusic();
    }
}

/**
 * Controls background music playback
 * 
 * @param {boolean} element - Play if true, pause if false
 */
function togglePlayback(element) {
    if (element) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

/**
 * Toggles sound on/off
 * 
 */
function toggleSound() {
    soundMuted = !soundMuted;
}