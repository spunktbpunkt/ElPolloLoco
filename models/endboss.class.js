class Endboss extends MovableObject {
    x = 1000;
    y = 140;
    width = 250;
    height = 300;
    speed = 0.5
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
        // this.animate();

    }

    animate() {
        if (isPaused) { return }
        let i = 0;

        // this.moveLeft();
        this.intervalId = setInterval(() => {
            if (this.world.character.x < this.x - 500 && !this.hadFirstContact) {
                i = 0;
                this.playAnimation(this.images_alert)
            } else {
                this.hadFirstContact = true;
                if (i < 10) {
                    this.playAnimation(this.images_alert)
                } else {
                    clearInterval(this.intervalId); // stoppt aktuellen interval
                    this.randomAttack(); // startet attack
                }
                i++;
            }
        }, 150);
    }

    randomAttack() {
        if (isPaused) return;
        // interval für animation
        this.randomAttackAnimationInterval = setInterval(() => {
            this.playAnimation(this.images_attack)
        }, 150);

        //interval für bewegung
        this.randomAttackMoveInterval = setInterval(() => {
            this.speed = 3 + Math.random() * 1;
            if (Math.random() > 0.7) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }, 500);
    }

    hit() {
        if (isPaused) return;
        this.energy -= 20;
        console.log(this.energy)
        if (this.energy < 0) this.energy = 0;
        this.world.statusBarEndboss.setPercentage(this.energy);

        if (this.energy === 0) {
            this.die(); // z. B. eine Animationsmethode
        }
    }

    die() {
        if (isPaused) return;
        this.endbossDead = true;
        this.speed = 0;
        this.dieInterval = setInterval(() => {
            this.playAnimationOnce(this.images_dead)
        }, 100);

        clearInterval(this.randomAttackAnimationInterval);
        clearInterval(this.randomAttackMoveInterval);
        console.log('endboss die')
        // this.playDeadAnimation?.();
        // ggf. draw() darauf reagieren lassen (youWin, etc.)
    }

}