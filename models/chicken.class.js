class Chicken extends MovableObject {
    y = 335;
    width = 100;
    height = 100;
    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    currentImage = 0;
    offset = {
        left:5,
        right:10,
        top:5,
        bottom:5
    }


    constructor() {
        super();
        this.loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking)
        this.x = 350 + Math.random() * 500;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            let i = this.currentImage % this.images_walking.length;
            let path = this.images_walking[i]
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 100);
    }

}