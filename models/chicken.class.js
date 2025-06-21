class Chicken extends MovableObject {
    height = 110;
    width = this.height / 98 * 95;
    y = 480 - this.height - 50;
    offset = {
        top: 5,
        bottom: 8,
        left: 4,
        right: 4
    };
    isDead = false; // Standardwert
    dead_image_path = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    image_dead = new Image();
    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.images_walking);
        this.image_dead.src = this.dead_image_path;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.images_walking);
            }
        }, 200);
    }

    // Optional: Methode um den Tod zu triggern
    die() {
        this.isDead = true;
        this.img = this.image_dead;
        // Eventuell hier noch weitere Logik, z.B. Sound oder andere Effekte
    }
}
