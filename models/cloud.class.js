class Cloud extends MovableObject {
    y = 20;
    width = 200;
    height = 150;

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.speed = Math.random()
        this.animate();
    }

    /**
     * Animates object by moving it to left.
     * 
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }
}