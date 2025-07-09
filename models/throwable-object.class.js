class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;
    // otherDirection = false;

    bottle_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    bottle_splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super();
        this.x = x
        this.y = y
        this.height = 80
        this.width = 80
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.bottle_rotation)
        this.loadImages(this.bottle_splash)
        // this.throw()
    }


    throw() {
        this.applyGravity();
        
        const direction = this.world.character.otherDirection ? (this.x -= 100, -1) : 1;
        this.moveInterval = setInterval(() => {
            this.x += 4 * direction;
        }, 10);

        this.animationId = setInterval(() => {
            this.playAnimation(this.bottle_rotation);
            if(this.y > 335) {
                this.x += 0;
                clearInterval(this.moveInterval);
                clearInterval(this.animationId);
                this.bottleSplash();
            };
        }, 75);
    }

    bottleSplash(){
        console.log("splash")
        let i = 0
        this.removeGravity();
        this.intervalId = setInterval(() => {
            // console.log(this.x)
            // console.log(this.y)
            if (i < 6) {
                        this.playAnimation(this.bottle_splash)
                    } else {
                        clearInterval(this.intervalId);
                        console.log(this.world.throwableObjects.pop());
                    }
                    i++;
            
        }, 50);
    }
}