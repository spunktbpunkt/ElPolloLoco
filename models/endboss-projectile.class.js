class EndbossProjectile extends MovableObject {
    speedY = 30;
    speedX = 8;
    moveInterval;
    animationInterval;
    offset = {
        left: 5,
        right: 10,
        top: 5,
        bottom: 5
    }
    projectile_images = [
        'img/4_enemie_boss_chicken/6_projectile/egg1.png',
        'img/4_enemie_boss_chicken/6_projectile/egg2.png',
        'img/4_enemie_boss_chicken/6_projectile/egg3.png',
        'img/4_enemie_boss_chicken/6_projectile/egg4.png'
    ]
    broke_image = 'img/4_enemie_boss_chicken/6_projectile/eggbroke.png';

    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.direction = direction;
        this.loadImage('img/4_enemie_boss_chicken/6_projectile/egg1.png');
        this.loadImages(this.projectile_images);
        this.loadImage(this.broke_image);
        this.throw_sound = new Audio('audio/throw.mp3');
        this.breaking_sound = new Audio('audio/egg-break.wav');
    }

    /**
     * Initiates the projectile throw with gravity, movement and animation
     * 
     * @returns {void}
     */
    throw() {
        if (isPaused) return;
        this.applyGravity();
        this.playSound(this.throw_sound, soundVolume);
        this.throwMove();
        this.throwAnimation();
    }

    /**
     * Handles horizontal movement during throw
     * 
     * @returns {void}
     */
    throwMove() {
        this.moveInterval = setInterval(() => {
            if (isPaused) return;
            this.x += this.speedX * this.direction;
            this.world.checkEndbossProjectileCollisions();
        }, 16);
    }

    /**
     * Manages rotation animation and ground collision detection
     * 
     * @returns {void}
     */
    throwAnimation() {
        this.animationInterval = setInterval(() => {
            if (isPaused) return;
            this.playAnimation(this.projectile_images);
            if (this.y > 380 || this.x < -100 || this.x > 2000) {
                this.projectileBreak();
            }
        }, 100);
    }

    /**
     * Triggers projectile break sequence when hitting ground or going off-screen
     * 
     * @returns {void}
     */
    projectileBreak() {
        if (isPaused) return;
        clearInterval(this.gravityInterval);
        this.playSound(this.breaking_sound, soundVolume);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);

        if (this.world && this.world.endbossProjectiles) {
            this.world.endbossProjectiles = this.world.endbossProjectiles.filter(obj => obj !== this);
        }

        if (this.world && this.world.brokenProjectiles) {
            this.world.brokenProjectiles.push(this);
        }

        this.showBreakAnimation();
    }

    /**
     * Shows break animation and removes projectile after 0.5 seconds
     * 
     * @returns {void}
     */
    showBreakAnimation() {
        this.loadImage(this.broke_image);
        setTimeout(() => {
            if (this.world && this.world.brokenProjectiles) {
                this.world.brokenProjectiles = this.world.brokenProjectiles.filter(obj => obj !== this);
            }
        }, 500);
    }

    /**
     * Destroys projectile and removes from world
     * 
     * @returns {void}
     */
    destroy() {
        if (isPaused) return;
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        if (this.world && this.world.endbossProjectiles) {
            this.world.endbossProjectiles = this.world.endbossProjectiles.filter(obj => obj !== this);
        }
    }
}