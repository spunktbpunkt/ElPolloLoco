class Endboss extends MovableObject {
    height = 350;
    width = this.height / 4 * 3;
    y = 500 - this.height - 50;
    x = 1400;

    angry_images =[];
    attack_images =[]
    
    images_walking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    constructor() {
        super().loadImage(this.images_walking[0]);
        // this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.images_walking);
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.images_walking)
            if(this.x -100 < world.character.x){
                // console.log("attack img")
            }else{
                // console.log("angry img")
            }
        }, 200);
    }

}