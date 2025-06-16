class Endboss extends MovableObject {
    height = 350;
    width = this.height / 4 * 3;
    y = 500 - this.height - 50;
    x = 1400;
    offset = {
        top: 55,
        bottom: 10,
        left: 5,
        right: 5
    }

    // angry_images =[];
    // attack_images =[]
    
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

    constructor() {
        super().loadImage(this.images_walking[0]);
        // this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.animate();
    }

    animate() {
        let i = 0;
        // this.moveLeft();
        setInterval(() => {
            // console.log(world.character.x)
            console.log(world.character.x + 300 >= this.x)
            if (i < 30) {
                this.playAnimation(this.images_walking)
            }else{
                this.playAnimation(this.images_attack)
            }
            i++
        }, 200);
    }

}