class Cloud extends MovableObject{
//img\5_background\layers\air.png
    y = 30
    width = 250
    height = 150

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =  -200 + Math.random() * 500;
        
    }
    
}