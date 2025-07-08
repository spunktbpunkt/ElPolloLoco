class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;

    constructor(imagePath,x,y){
        super();
        this.loadImage(imagePath)
        this.x = x;
        this.y = y;
    }
}