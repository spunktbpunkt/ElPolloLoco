class Character extends MovableObject {  // durch 'extends' alle Variablen und Funktionen von MovableObject verfügbar
    y = 130; //130
    height = 300;
    width = 160;
    speed = 10;
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    images_idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    images_longidle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ];

    images_falling = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    world;
    offset = {
        left: 25,
        right: 60,
        top: 115,
        bottom: 10
    }
    falling = false
    jumping = false;
    jumpInterval;
    waitInterval;
    fallInterval;
    movingInterval;
    animationInterval;
    lastKeyboardHit = 0;


    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.images_walking)
        this.loadImages(this.images_idle)
        this.loadImages(this.images_longidle)
        this.loadImages(this.images_jumping)
        this.loadImages(this.images_falling)
        this.loadImages(this.images_hurt)
        this.loadImages(this.images_dead)
        this.applyGravity()
        this.animate();
        this.lastKeyboardHit = new Date().getTime();
        this.walking_sound = new Audio('audio/footstep.mp3');
        this.hurt_sound = new Audio('audio/ouchie.mp3');
        this.die_sound = new Audio('audio/die-sound.mp3');
        this.jump_sound = new Audio('audio/jump-sound.mp3');
        this.snorring_sound = new Audio('audio/snorring.wav');

    }

    animate() {
        if (isPaused) return;
        this.moving()
        this.animation();
    }

    moving() {
        if (isPaused) return;
        this.movingInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.playSound(this.walking_sound, 1);
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.playSound(this.walking_sound, 1);
                this.moveLeft();
            }
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
                this.playSound(this.jump_sound, 1);
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    // Füge diese Methode zur Character-Klasse hinzu:

    stopAllIntervals() {
        // Stoppe alle Character-Intervalle
        if (this.movingInterval) {
            clearInterval(this.movingInterval);
            this.movingInterval = null;
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        if (this.jumpInterval) {
            clearInterval(this.jumpInterval);
            this.jumpInterval = null;
        }
        if (this.fallInterval) {
            clearInterval(this.fallInterval);
            this.fallInterval = null;
        }
        if (this.waitInterval) {
            clearInterval(this.waitInterval);
            this.waitInterval = null;
        }

        // Stoppe auch das Schnarchen
        this.stopSnorring();
    }

    animation() {
        if (isPaused) return;
        this.currentImageOnce = 0;

        // Frame counter für langsamere Idle-Animationen
        if (!this.frameCounter) this.frameCounter = 0;

        this.animationInterval = setInterval(() => {
            this.frameCounter++;
            this.handleKeyboardInput();
            this.handleGameEndCheck();
            this.selectAnimation();
        }, 50);
    }

    handleKeyboardInput() {
        // Aktualisiere lastKeyboardHit bei jeder Tasteneingabe
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.SPACE) {
            this.lastKeyboardHit = new Date().getTime();
            this.stopSnorring();
        }
    }

    handleGameEndCheck() {
        // Stoppe das Schnarchen wenn das Spiel beendet ist
        if (this.world && this.world.gameEnd) {
            this.stopSnorring();
        }
    }

    stopSnorring() {
        if (this.snorring_sound) {
            this.snorring_sound.pause();
            this.snorring_sound.currentTime = 0;
        }
    }

    selectAnimation() {
        if (this.isDead()) {
            this.handleDeadAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpFallAnimation();
        } else {
            this.handleGroundAnimation();
        }
    }

    handleDeadAnimation() {
        this.playAnimationOnce(this.images_dead);
        clearInterval(this.movingInterval);
        this.playSound(this.die_sound, 1, this.animationInterval);

        setTimeout(() => {
            youLose();
        }, 1000);
    }

    handleHurtAnimation() {
        this.playAnimation(this.images_hurt);
        this.playSound(this.hurt_sound, 1);
        // Reset des Idle-Timers bei Schaden - Character "wacht auf"
        this.lastKeyboardHit = new Date().getTime();
        this.stopSnorring();
    }

    handleJumpFallAnimation() {
        if (this.falling) {
            this.currentImageOnce = 0;
            this.fallAnimation();
        } else {
            this.currentImageOnce = 0;
            this.jumpAnimation();
        }
    }

    handleGroundAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
        } else {
            this.handleIdleStates();
        }
    }

    handleIdleStates() {
        let timeSinceLastInput = new Date().getTime() - this.lastKeyboardHit;

        if (timeSinceLastInput > 7000) {
            this.handleLongIdle();
        } else if (timeSinceLastInput > 2000) {
            this.handleNormalIdle();
        } else {
            this.handleStillState();
        }
    }

    handleLongIdle() {
        // Nur alle 4 Frames (= alle 200ms) das Bild wechseln
        if (this.frameCounter % 4 === 0) {
            this.playAnimation(this.images_longidle);
        }
        // Schnarchen nur starten wenn es noch nicht läuft
        if (this.snorring_sound && this.snorring_sound.paused) {
            this.playSound(this.snorring_sound, 0.3);
        }
    }

    handleNormalIdle() {
        // Nur alle 3 Frames (= alle 150ms) das Bild wechseln
        if (this.frameCounter % 3 === 0) {
            this.playAnimation(this.images_idle);
        }
    }

    handleStillState() {
        // In den ersten 2 Sekunden: Zeige das erste Idle-Bild (Stillstand)
        this.loadImage(this.images_idle[0]);
    }

    jumpAnimation() {
        if (isPaused) return;
        clearInterval(this.animationInterval)
        this.jumpInterval = setInterval(() => {
            if (!this.falling) {
                this.playAnimationOnce(this.images_jumping)
            } else {
                clearInterval(this.jumpInterval)
                this.animation()
            }
        }, 50);
    }


    fallAnimation() {
        if (isPaused) return;
        clearInterval(this.animationInterval)
        this.fallInterval = setInterval(() => {
            if (this.falling) {
                this.playAnimationOnce(this.images_falling)
            } else {
                clearInterval(this.fallInterval)
                this.animation()
            }
        }, 50);

    }

}