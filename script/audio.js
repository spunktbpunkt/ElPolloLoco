let backgroundMusic = new Audio('audio/mariachi.wav');
let backgroundMusicVolume = 0.1;
let soundVolume = 0.2;
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
    if (soundMuted) return;

    if (isWin) {
        let applause = new Audio('audio/applause.mp3');
        applause.volume = soundVolume;
        applause.play();
    }
}

/**
 * Stops all audio elements including enemy sounds
 * 
 */
function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    if (world && world.level) {
        stopEnemySounds();
        stopCharacterSounds();
        stopThrowableSounds();
    }
}

/**
 * Stops all enemy audio
 * 
 */
function stopEnemySounds() {
    world.level.enemies.forEach(enemy => {
        if (enemy.chicken_sound) {
            enemy.chicken_sound.pause();
            enemy.chicken_sound.currentTime = 0;
        }
    });
}

/**
 * Stops all character audio
 * 
 */
function stopCharacterSounds() {
    if (world.character) {
        ['walking_sound', 'hurt_sound', 'die_sound', 'jump_sound', 'snorring_sound'].forEach(soundName => {
            if (world.character[soundName]) {
                world.character[soundName].pause();
                world.character[soundName].currentTime = 0;
            }
        });
    }
}

/**
 * Stops all throwable object audio
 * 
 */
function stopThrowableSounds() {
    world.throwableObjects.forEach(obj => {
        if (obj.throw_sound) {
            obj.throw_sound.pause();
            obj.throw_sound.currentTime = 0;
        }
        if (obj.breaking_sound) {
            obj.breaking_sound.pause();
            obj.breaking_sound.currentTime = 0;
        }
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