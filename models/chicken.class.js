class Chicken extends MovableObject {
    y = 335;
    width = 100;
    height = 100;
    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    images_dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    currentImage = 0;
    offset = {
        left: 5,
        right: 10,
        top: 5,
        bottom: 5
    }
    moveInterval;
    isDead = false;

    constructor() {
        super();
        this.loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking)
        this.loadImages(this.images_dead)
        this.x = 350 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.chicken_sound = new Audio('audio/chicken-noise.mp3');
    }

    /**
    * Starts chicken animation and movement
    * 
    * @returns {void}
    */
    animate() {
        if (isPaused) { return }
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.moveInterval = setInterval(() => {
            let i = this.currentImage % this.images_walking.length;
            let path = this.images_walking[i]
            this.img = this.imageCache[path]
            this.currentImage++;
            if (this.isDead) {
                this.die();
            }
        }, 100);
    }

    /**
     * Handles chicken death sequence
     * 
     * @returns {void}
     */
    die() {
        if (isPaused) return;
        this.enemyDead = true;
        this.speed = 0;
        clearInterval(this.moveInterval);
        this.playAnimationOnce(this.images_dead)
        this.playSound(this.chicken_sound, 1);
        setTimeout(() => {
            const index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

}