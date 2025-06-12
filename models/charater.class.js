class Character extends MovableObject {
    height = 250;
    width = this.height / 7 * 4;
    y = 305 - this.height - 45; //480
    speed = 10;
    images_walking = ['img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x ) {
                this.x += this.speed
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation    
                this.playAnimation(this.images_walking)
                // let i = this.currentImage % this.images_walking.length; // let i = 6 % 6; => 1, Rest 0 // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
                // let path = this.images_walking[i]
                // this.img = this.imageCache[path];
                // this.currentImage++;
            }
        }, 50);
    }

    jump() {
        console.log('jump')
    }
}