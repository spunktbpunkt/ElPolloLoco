class Chicken extends MovableObject {
    height = 110;
    width = this.height / 98 * 95;
    // y = 480 - this.height - 50;
    y = 400 - this.height - 50;
    offset = {
        top: 5,
        bottom: 8,
        left: 4,
        right: 4
    }


    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        // this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.images_walking);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.images_walking)
        }, 200);
    }

}