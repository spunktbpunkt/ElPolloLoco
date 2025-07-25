class Character extends MovableObject {
    y = 130;
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
        left: 30,
        right: 70,
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

    /**
     * Creates a new Character instance and initializes all properties
     * 
     * @returns {void}
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadAllImages();
        this.initializeAudio();
        this.applyGravity()
        this.animate();
        this.lastKeyboardHit = new Date().getTime();
    }

    /**
     * Loads all character animation images into cache
     * 
     * @returns {void}
     */
    loadAllImages() {
        this.loadImages(this.images_walking)
        this.loadImages(this.images_idle)
        this.loadImages(this.images_longidle)
        this.loadImages(this.images_jumping)
        this.loadImages(this.images_falling)
        this.loadImages(this.images_hurt)
        this.loadImages(this.images_dead)
    }

    /**
     * Initializes all character audio elements
     * 
     * @returns {void}
     */
    initializeAudio() {
        this.walking_sound = new Audio('audio/footstep.mp3');
        this.hurt_sound = new Audio('audio/ouchie.mp3');
        this.die_sound = new Audio('audio/die-sound.mp3');
        this.jump_sound = new Audio('audio/jump-sound.mp3');
        this.snorring_sound = new Audio('audio/snorring.wav');
    }

    /**
     * Starts character animation and movement systems
     * 
     * @returns {void}
     */
    animate() {
        if (isPaused) return;
        this.moving()
        this.animation();
    }

    /**
     * Stops all character intervals and clears resources
     * 
     * @returns {void}
     */
    stopAllIntervals() {
        this.clearMovementIntervals();
        this.clearAnimationIntervals();
        this.stopSnorring();
    }

    /**
     * Clears movement-related intervals
     * 
     * @returns {void}
     */
    clearMovementIntervals() {
        if (this.movingInterval) {
            clearInterval(this.movingInterval);
            this.movingInterval = null;
        }
    }

    /**
     * Clears animation-related intervals
     * 
     * @returns {void}
     */
    clearAnimationIntervals() {
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
    }

    /**
     * Stops snoring sound and resets audio element
     * 
     * @returns {void}
     */
    stopSnorring() {
        if (this.snorring_sound) {
            this.snorring_sound.pause();
            this.snorring_sound.currentTime = 0;
        }
    }
}