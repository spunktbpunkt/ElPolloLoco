class Bottles extends MovableObject{
        height = 80;
    width = this.height / 98 * 95;
    y = 350;
    // x = 1000;
        offset = {
        top: 15,
        bottom: 10,
        left: 20,
        right: 20
    }

        constructor() {
            super();
            let randomImg = Math.random() > 0.5 ? 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png' : 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
            this.loadImage(randomImg);
            // this.x = 100 + Math.random() * 2000+10;
    }


}