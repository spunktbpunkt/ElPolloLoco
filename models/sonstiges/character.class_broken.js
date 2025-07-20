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

    offset = {
        left: 25,
        right: 60,
        top: 115,
        bottom: 10
    };

    world;
    falling = false;
    jumping = false;
    jumpingUpAnimationPlayed = false;
    fallingDownAnimationPlayed = false;
    movingInterval;
    animationInterval;

    constructor() {
        super();
        this.loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_falling);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.applyGravity();
        this.animate();
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpingUpAnimationPlayed = false;
            this.fallingDownAnimationPlayed = false;
            this.speedY = 40;
        }
    }

    animate() {
        this.movingInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.jumping && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.startStandardAnimation();
    }

    startStandardAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.images_dead);
                clearInterval(this.movingInterval);
                clearInterval(this.animationInterval);
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
            } else if (this.jumping) {
                if (this.speedY > 0 && !this.jumpingUpAnimationPlayed) {
                    this.playAnimationOnce(this.images_jumping);
                    this.jumpingUpAnimationPlayed = true;
                } else if (this.speedY < 0 && !this.fallingDownAnimationPlayed) {
                    this.playAnimationOnce(this.images_falling);
                    this.fallingDownAnimationPlayed = true;
                }

                // Sprung abgeschlossen → Zustand zurücksetzen
                if (!this.isAboveGround() && this.speedY === 0) {
                    this.jumping = false;
                    this.jumpingUpAnimationPlayed = false;
                    this.fallingDownAnimationPlayed = false;
                }
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.images_walking);
            } else {
                this.playAnimation(this.images_idle);
            }
        }, 50);
    }
}
