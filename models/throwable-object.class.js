class ThrowableObject extends MovableObject{
    speedY = 30;
    speedX = 20;

    constructor(x,y){
        super();
        this.x = x
        this.y = y
        this.height = 80
        this.width = 80
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.throw()
    }


    throw(){
        this.applyGravity();
        setInterval(() => {
           this.x += 4; 
        }, 10);
    }
}