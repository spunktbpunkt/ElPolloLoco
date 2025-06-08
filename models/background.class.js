class Background extends MovableObject {
    imgPath;
    width = 1600;
    height = 480;

    constructor(imgPath) {
        // super()
        // this.imgPath = imgPath;
        super().loadImage(imgPath);
        this.x = 0;
        // super().loadImage('img/5_background/first_half_background.png');

    }
}