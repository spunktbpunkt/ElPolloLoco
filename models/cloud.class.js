class Cloud extends MovableObject {
    y = 20;
    width = 200;
    height = 150;
    // speed = 0.5;
    // time = 1000 / 60; //fps

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        // this.x = Math.random()*500;
        this.speed = Math.random()
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}