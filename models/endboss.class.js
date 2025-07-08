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
    currentImage = 0;
    offset = {
        left:10,
        right:15,
        top:50,
        bottom:10
    }
    

    constructor() {
        super();
        this.loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert)
        this.animate();
        // this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.images_alert.length;
            let path = this.images_alert[i]
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 100);
    }

}