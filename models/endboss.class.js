class Endboss extends MovableObject {
    x = 1500;
    y = 140;
    width = 250;
    height = 300;
    speed = 1
    images_alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    currentImage = 0;
    offset = {
        left: 10,
        right: 15,
        top: 50,
        bottom: 10
    }
    world;
    hadFirstContact = false;
    randomAttackAnimationInterval;
    randomAttackIntervalTwo;
    dieInterval;
    isDead = false; // Standardwert

    constructor() {
        super();
        this.loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert)
        this.loadImages(this.images_attack)
        this.loadImages(this.images_dead)
        this.chicken_sound = new Audio('audio/chicken-noise.mp3');
    }

    /**
    * Starts endboss animation and behavior logic
    * 
    * @returns {void}
    */
    animate() {
        if (isPaused) { return }
        let i = 0;

        this.intervalId = setInterval(() => {
            if (this.world.character.x < this.x - 500 && !this.hadFirstContact) {
                i = 0;
                this.playAnimation(this.images_alert)
            } else {
                this.hadFirstContact = true;
                if (i < 10) {
                    this.playAnimation(this.images_alert)
                } else {
                    clearInterval(this.intervalId);
                    this.randomAttack();
                }
                i++;
            }
        }, 150);
    }

    /**
     * Starts random attack mode with animations and movement
     * 
     * @returns {void}
     */
    randomAttack() {
        if (isPaused) return;
        this.randomAttackAnimationInterval = setInterval(() => {
            this.playAnimation(this.images_attack)
        }, 150);

        this.randomAttackMoveInterval = setInterval(() => {
            this.speed = 25 + Math.random() * 1;
            if (Math.random() > 0.8) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }, 400);
    }

    /**
     * Handles endboss taking damage
     * 
     * @returns {void}
     */
    hit() {
        if (isPaused) return;
        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;
        this.playSound(this.chicken_sound, soundVolume)
        this.world.statusBarEndboss.setPercentage(this.energy);

        if (this.energy === 0) {
            this.die();
        }
    }

    /**
     * Executes endboss death sequence
     * 
     * @returns {void}
     */
    die() {
        if (isPaused || this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        let frameIndex = 0;

        this.dieInterval = setInterval(() => {
            if (frameIndex < this.images_dead.length) {
                this.img = this.imageCache[this.images_dead[frameIndex]];
                frameIndex++;
            } else {
                clearInterval(this.dieInterval);
                youWin();
            }
        }, 150);

        clearInterval(this.randomAttackAnimationInterval);
        clearInterval(this.randomAttackMoveInterval);
    }
}