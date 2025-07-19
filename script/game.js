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
let localStorageMusic
let localStorageSound

function initNew() {
    getLocalStorage();
    if (localStorageMusic == 'true') {
        document.getElementById('musicIcon').src = "img/icon/music-icon.svg"
        musicMuted = false
    } else {
        document.getElementById('musicIcon').src = "img/icon/no-music-icon.svg"
        musicMuted = true
    }

    if (localStorageSound == 'true') {
        document.getElementById('soundIcon').src = "img/icon/sound-icon.svg"
        soundMuted = false
    } else {
        document.getElementById('soundIcon').src = "img/icon/no-sound-icon.svg"
        soundMuted = true
    }
}
function getLocalStorage() {
    localStorageMusic = localStorage.getItem('music')
    localStorageSound = localStorage.getItem('sound')
}

function init() {
    getLocalStorage();

    gameStarted = true;
    isPaused = false;
    world = null;

    document.getElementById("extraIcon").src = "img/icon/pause-icon.svg";
    showGame();
    setupCanvasAndWorld();

    // 🎯 Wichtig: Reset vom display-Stil für das Outro
    const outro = document.getElementById("outro");
    outro.style.display = ''; // ← zurücksetzen auf Standard

    if (localStorageMusic == 'true') {
        playBackgroundMusic();
    }

    setupTouchControls();
}


function setupCanvasAndWorld() {
    canvas = document.getElementById("canvas");
    const level = createLevel();
    world = new World(canvas, keyboard, level);

    // 💡 explizit initialisieren
    world.gameEnd = false;
    world.characterDead = false;
    world.endbossDead = false;
}

function showGame() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("outro").classList.remove("outro");
    document.getElementById("canvasDiv").classList.remove("hidden");
    document.getElementById("gameplayBtnDiv").classList.remove("visibilityNone");
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
    console.log('you win gameEnd is ' + world.gameEnd)
    // Wenn das Spiel bereits beendet wurde, nicht erneut ausführen
    if (world && world.gameEnd) return;

    if (world) {
        world.gameEnd = true;
        world.endbossDead = true;   // Hier da  s Flag setzen
        isPaused = false;
    }

    const outro = document.getElementById("outro");
    const winImg = document.getElementById("youWinImg");
    const loseImg = document.getElementById("youLoseImg");
    const btnDiv = document.getElementById("outroBtnDiv");

    outro.classList.remove("hidden");
    // outro.classList.remove("outro"); // Optional
    winImg.classList.remove("hidden");
    loseImg.classList.add("hidden");
    btnDiv.classList.remove("hidden");

    backgroundMusic.pause();
}


function youLose() {
    // Verhindere Mehrfachausführung
        console.log('you lose gameEnd is ' + world.gameEnd)


    if (world && world.gameEnd) return;

    if (world) {
        world.gameEnd = true;
        world.characterDead = true;
        isPaused = false;
    }

    const outro = document.getElementById("outro");
    const winImg = document.getElementById("youWinImg");
    const loseImg = document.getElementById("youLoseImg");
    const btnDiv = document.getElementById("outroBtnDiv");

    outro.classList.remove("hidden");      // Zeige Outro an
    winImg.classList.add("hidden");        // Verstecke Win-Bild
    loseImg.classList.remove("hidden");    // Zeige Lose-Bild
    btnDiv.classList.remove("hidden");     // Zeige Buttons

    backgroundMusic.pause();               // Stoppe Musik
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
  console.log('🏁 startPage() gestartet');
  gameStarted = false;
  world = null;
  backgroundMusic.pause();

  document.getElementById('intro').classList.remove('hidden');
  document.getElementById('canvasDiv').classList.add('hidden');
  document.getElementById('gameplayBtnDiv').classList.add('visibilityNone');
  document.getElementById('extraIcon').src = 'img/icon/info-icon.svg';

  const outro = document.getElementById('outro');
  const winImg = document.getElementById('youWinImg');
  const loseImg = document.getElementById('youLoseImg');
  const btnDiv = document.getElementById('outroBtnDiv');

  outro.classList.add('hidden');
  winImg.classList.add('hidden');
  loseImg.classList.add('hidden');
  btnDiv.classList.add('hidden');

  // **Forciertes Style-Ausblenden**
  outro.style.display = 'none';
  console.log(
    'DEBUG: outro-klassen:',
    outro.className,
    'style.display:',
    outro.style.display
  );
}

function impressum(){
    document.getElementById("impressumDiv").classList.toggle('hidden')
}


// function startPage() {
//     gameStarted = false;
//     world = null;
//     backgroundMusic.pause();

//     // Sichtbarkeit / Klassen zurücksetzen
//     document.getElementById("intro").classList.remove("hidden");
//     document.getElementById("canvasDiv").classList.add("hidden");
//     document.getElementById("gameplayBtnDiv").classList.add("visibilityNone");

//     // 🎯 Hier sicherstellen, dass alles für outro zurückgesetzt wird:
//     const outro = document.getElementById("outro");
//     const winImg = document.getElementById("youWinImg");
//     const loseImg = document.getElementById("youLoseImg");
//     const btnDiv = document.getElementById("outroBtnDiv");

//     outro.classList.add("hidden");
//     // outro.classList.add("outro"); // falls nötig fürs CSS
//     winImg.classList.add("hidden");
//     loseImg.classList.add("hidden");
//     btnDiv.classList.add("hidden");

//     document.getElementById("extraIcon").src = "img/icon/info-icon.svg";
// }



function toggleMusic() {
    musicMuted = !musicMuted;
    if (backgroundMusic.volume = musicMuted) {
        0
        backgroundMusic.pause()
    } else {
        backgroundMusicVolume;
        if (gameStarted) playBackgroundMusic();
    }
    console.log(backgroundMusic.volume)
}

function toggleSound() {
    soundMuted = !soundMuted;
}


function changeMusic(name) {
    const musicIcon = document.getElementById(name)
    if (musicIcon.src.includes('no')) {
        musicIcon.src = "img/icon/music-icon.svg"
        localStorage.setItem('music', 'true')
    } else {
        musicIcon.src = "img/icon/no-music-icon.svg"
        localStorage.setItem('music', 'false')
    }
    toggleMusic();
}

function changeSound(name) {
    const soundIcon = document.getElementById(name)
    if (soundIcon.src.includes('no')) {
        soundIcon.src = "img/icon/sound-icon.svg"
        localStorage.setItem('sound', 'true')
    } else {
        soundIcon.src = "img/icon/no-sound-icon.svg"
        localStorage.setItem('sound', 'false')
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

function setupTouchControls() {
    const buttonImgs = document.querySelectorAll('#gameplayBtnDiv img');

    buttonImgs.forEach(img => {
        const key = img.dataset.key;

        if (!key) return;

        img.addEventListener('mousedown', () => {
            keyboard[key] = true;
        });

        img.addEventListener('mouseup', () => {
            keyboard[key] = false;
        });

        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard[key] = true;
        });

        img.addEventListener('touchend', () => {
            keyboard[key] = false;
        });
    });
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
