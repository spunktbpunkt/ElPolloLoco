class BackgroundObject extends MovableObject{
    //     imgPath;
    width = 720;
    height = 480;

    constructor(imagePath,x,y){
        super().loadImage(imagePath)
        this.y = y; 
        this.x = x;
    }
}