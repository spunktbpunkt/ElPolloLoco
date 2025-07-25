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

    /**
    * Starts character animation and movement
    * 
    * @returns {void}
    */
    animate() {
        if (isPaused) return;
        this.moving()
        this.animation();
    }

    /**
     * Handles character movement based on keyboard input
     * 
     * @returns {void}
     */
    moving() {
        if (isPaused) return;
        this.movingInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.movingRight()
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.movingLeft()
            }
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
                this.movingJumping()
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Moves character right with sound
     * 
     * @returns {void}
     */
    movingRight() {
        this.otherDirection = false;
        this.playSound(this.walking_sound, soundVolume);
        this.moveRight();
    }

    /**
     * Moves character left with sound
     * 
     * @returns {void}
     */
    movingLeft() {
        this.otherDirection = true;
        this.playSound(this.walking_sound, soundVolume);
        this.moveLeft();
    }

    /**
     * Makes character jump with sound
     * 
     * @returns {void}
     */
    movingJumping() {
        this.playSound(this.jump_sound, soundVolume);
        this.jump();
    }

    /**
     * Stops all character intervals
     * 
     * @returns {void}
     */
    stopAllIntervals() {
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

        this.stopSnorring();
    }

    /**
     * Handles character animation states
     * 
     * @returns {void}
     */
    animation() {
        if (isPaused) return;
        this.currentImageOnce = 0;

        if (!this.frameCounter) this.frameCounter = 0;

        this.animationInterval = setInterval(() => {
            this.frameCounter++;
            this.handleKeyboardInput();
            this.handleGameEndCheck();
            this.selectAnimation();
        }, 50);
    }

    /**
     * Handles keyboard input tracking
     * 
     * @returns {void}
     */
    handleKeyboardInput() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.D) {
            this.lastKeyboardHit = new Date().getTime();
            this.stopSnorring();
        }
    }

    /**
     * Checks game end state and stops snoring
     * 
     * @returns {void}
     */
    handleGameEndCheck() {
        if (this.world && this.world.gameEnd) {
            this.stopSnorring();
        }
    }

    /**
     * Stops snoring sound
     * 
     * @returns {void}
     */
    stopSnorring() {
        if (this.snorring_sound) {
            this.snorring_sound.pause();
            this.snorring_sound.currentTime = 0;
        }
    }

    /**
     * Selects appropriate animation based on character state
     * 
     * @returns {void}
     */
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

    /**
     * Handles death animation and game over
     * 
     * @returns {void}
     */
    handleDeadAnimation() {
        this.playAnimationOnce(this.images_dead);
        clearInterval(this.movingInterval);
        this.playSound(this.die_sound, soundVolume, this.animationInterval);

        setTimeout(() => {
            youLose();
        }, 1000);
    }

    /**
     * Handles hurt animation and sound
     * 
     * @returns {void}
     */
    handleHurtAnimation() {
        this.playAnimation(this.images_hurt);
        this.playSound(this.hurt_sound, soundVolume);
        this.lastKeyboardHit = new Date().getTime();
        this.stopSnorring();
    }

    /**
     * Handles jump and fall animations
     * 
     * @returns {void}
     */
    handleJumpFallAnimation() {
        if (this.falling) {
            this.currentImageOnce = 0;
            this.fallAnimation();
        } else {
            this.currentImageOnce = 0;
            this.jumpAnimation();
        }
    }

    /**
     * Handles ground-based animations
     * 
     * @returns {void}
     */
    handleGroundAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
        } else {
            this.handleIdleStates();
        }
    }

    /**
     * Manages different idle states based on time
     * 
     * @returns {void}
     */
    handleIdleStates() {
        let timeSinceLastInput = new Date().getTime() - this.lastKeyboardHit;

        if (timeSinceLastInput > 5500) {
            this.handleLongIdle();
        } else if (timeSinceLastInput > 500) {
            this.handleNormalIdle();
        } else {
            this.handleStillState();
        }
    }

    /**
     * Handles long idle animation with snoring
     * 
     * @returns {void}
     */
    handleLongIdle() {
        if (this.frameCounter % 4 === 0) {
            this.playAnimation(this.images_longidle);
        }
        if (this.snorring_sound && this.snorring_sound.paused) {
            this.playSound(this.snorring_sound, soundVolume);
        }
    }

    /**
     * Handles normal idle animation
     * 
     * @returns {void}
     */
    handleNormalIdle() {
        if (this.frameCounter % 3 === 0) {
            this.playAnimation(this.images_idle);
        }
    }

    /**
     * Handles still state animation
     * 
     * @returns {void}
     */
    handleStillState() {
        this.loadImage(this.images_idle[0]);
    }

    /**
     * Handles jump animation sequence
     * 
     * @returns {void}
     */
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

    /**
     * Handles fall animation sequence
     * 
     * @returns {void}
     */
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