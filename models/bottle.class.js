class Bottles extends MovableObject {
    height = 80;
    width = this.height / 98 * 95;
    y = 350;
    offset = {
        top: 15,
        bottom: 10,
        left: 20,
        right: 35
    }
    outerLines = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super();
        let randomImg = Math.random() > 0.5 ? 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png' : 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
        this.loadImage(randomImg);
    }
}