class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 160;
    speed = 10;

    animations = {
        walking: [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
        ],
        dead: [
            'img/2_character_pepe/5_dead/D-51.png',
            'img/2_character_pepe/5_dead/D-52.png',
            'img/2_character_pepe/5_dead/D-53.png',
            'img/2_character_pepe/5_dead/D-54.png',
            'img/2_character_pepe/5_dead/D-55.png',
            'img/2_character_pepe/5_dead/D-56.png',
            'img/2_character_pepe/5_dead/D-57.png'
        ],
        hurt: [
            'img/2_character_pepe/4_hurt/H-41.png',
            'img/2_character_pepe/4_hurt/H-42.png',
            'img/2_character_pepe/4_hurt/H-43.png',
        ],
        idle: [
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
        ],
        longIdle: [
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
        ],
        jumping: [
            'img/2_character_pepe/3_jump/J-31.png',
            'img/2_character_pepe/3_jump/J-32.png',
            'img/2_character_pepe/3_jump/J-33.png',
            'img/2_character_pepe/3_jump/J-34.png'
        ],
        falling: [
            'img/2_character_pepe/3_jump/J-35.png',
            'img/2_character_pepe/3_jump/J-36.png',
            'img/2_character_pepe/3_jump/J-37.png',
            'img/2_character_pepe/3_jump/J-38.png',
            'img/2_character_pepe/3_jump/J-39.png'
        ]
    };

    sounds = {
        walking: { file: 'audio/footstep.mp3', volume: 'soundVolume' },
        hurt: { file: 'audio/ouchie.mp3', volume: 'soundVolume' },
        die: { file: 'audio/die-sound.mp3', volume: 'soundVolume' },
        jump: { file: 'audio/jump-sound.mp3', volume: 'soundVolume' },
        snoring: { file: 'audio/snorring.wav', volume: 'soundVolume' }
    };

    animationConfig = {
        dead: { type: 'once', sound: 'die', callback: () => setTimeout(() => youLose(), 1000) },
        hurt: { type: 'loop', sound: 'hurt' },
        jumping: { type: 'once', interval: 50 },
        falling: { type: 'once', interval: 50 },
        walking: { type: 'loop', sound: 'walking' },
        idle: { type: 'loop', frameSkip: 4 },
        longIdle: { type: 'loop', frameSkip: 8, sound: 'snoring' }
    };

    world;
    offset = { left: 30, right: 70, top: 115, bottom: 10 };
    falling = false;
    jumping = false;
    intervals = {};
    lastKeyboardHit = 0;
    frameCounter = 0;
    currentState = 'idle';

    constructor() {
        super();
        this.loadImage(this.animations.walking[0]);
        this.loadAllAnimations();
        this.loadAllSounds();
        this.applyGravity();
        this.animate();
        this.lastKeyboardHit = new Date().getTime();
    }

    /**
     * Loads all animation image arrays
     */
    loadAllAnimations() {
        Object.values(this.animations).forEach(images => {
            this.loadImages(images);
        });
    }

    /**
     * Loads all sound files
     */
    loadAllSounds() {
        Object.entries(this.sounds).forEach(([key, config]) => {
            this[key + '_sound'] = new Audio(config.file);
        });
    }

    /**
     * Main animation loop
     */
    animate() {
        if (isPaused) return;
        this.startMovement();
        this.startAnimation();
    }

    /**
     * Starts movement interval
     */
    startMovement() {
        this.intervals.movement = setInterval(() => {
            if (isPaused) return;
            
            this.handleMovementInput();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Handles movement input
     */
    handleMovementInput() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveWithSound('right');
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveWithSound('left');
        }
        if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
            this.jumpWithSound();
        }
    }

    /**
     * Movement with sound
     */
    moveWithSound(direction) {
        this.otherDirection = direction === 'left';
        this.playSound(this.walking_sound, soundVolume);
        direction === 'left' ? this.moveLeft() : this.moveRight();
    }

    /**
     * Jump with sound
     */
    jumpWithSound() {
        this.playSound(this.jump_sound, soundVolume);
        this.jump();
    }

    /**
     * Starts animation interval
     */
    startAnimation() {
        this.intervals.animation = setInterval(() => {
            if (isPaused) return;
            
            this.frameCounter++;
            this.updateLastInput();
            this.updateCurrentState();
            this.playCurrentAnimation();
        }, 50);
    }

    /**
     * Updates last input time
     */
    updateLastInput() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || 
            this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.D) {
            this.lastKeyboardHit = new Date().getTime();
            this.stopSnoring();
        }
    }

    /**
     * Determines current animation state
     */
    updateCurrentState() {
        if (this.isDead()) {
            this.currentState = 'dead';
        } else if (this.isHurt()) {
            this.currentState = 'hurt';
        } else if (this.isAboveGround()) {
            this.currentState = this.falling ? 'falling' : 'jumping';
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.currentState = 'walking';
        } else {
            this.currentState = this.getIdleState();
        }
    }

    /**
     * Determines idle state based on time since last input
     */
    getIdleState() {
        const timeSinceLastInput = new Date().getTime() - this.lastKeyboardHit;
        return timeSinceLastInput > 5500 ? 'longIdle' : 'idle';
    }

    /**
     * Plays current animation based on state
     */
    playCurrentAnimation() {
        const config = this.animationConfig[this.currentState];
        const images = this.animations[this.currentState];

        if (!config || !images) return;

        if (config.frameSkip && this.frameCounter % config.frameSkip !== 0) return;

        if (config.sound) {
            this.playConfiguredSound(config.sound);
        }

        if (config.type === 'once') {
            this.playAnimationOnce(images);
            if (config.callback) config.callback();
        } else {
            this.playAnimation(images);
        }
    }

    /**
     * Plays configured sound
     */
    playConfiguredSound(soundKey) {
        const sound = this[soundKey + '_sound'];
        if (sound) {
            if (soundKey === 'snoring' && sound.paused) {
                this.playSound(sound, soundVolume);
            } else if (soundKey !== 'snoring') {
                this.playSound(sound, soundVolume);
            }
        }
    }

    /**
     * Stops snoring sound
     */
    stopSnoring() {
        if (this.snoring_sound) {
            this.snoring_sound.pause();
            this.snoring_sound.currentTime = 0;
        }
    }

    /**
     * Stops all intervals
     */
    stopAllIntervals() {
        Object.values(this.intervals).forEach(interval => {
            if (interval) clearInterval(interval);
        });
        this.intervals = {};
        this.stopSnoring();
    }
}