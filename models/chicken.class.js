class Chicken extends MovableObject {
    height = 120;
    width = this.height / 4 * 3;
    y = 480 - this.height - 50;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 500;
    }

    eat() {
        console.log('eat')
    }
}