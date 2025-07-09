class MovableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit nach unten
    acceleration = 5; // Beschleinigung
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 50);
    }

    removeGravity(){
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.x += 0
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 130
        }
    }



    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    // playAnimation(images, loop = true, reset = false) {
    //     if (reset) {
    //         this.currentImage = 0;
    //     }

    //     if (this.currentImage < images.length) {
    //         const path = images[this.currentImage];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     } else if (loop) {
    //         this.currentImage = 0;
    //         const path = images[this.currentImage];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     } else {
    //         // bleib beim letzten Bild
    //         const path = images[images.length - 1];
    //         this.img = this.imageCache[path];
    //     }
    //     if (this instanceof Character) console.log(this.img)
    // }


    playAnimation(images) {
        // if (this instanceof Character) console.log(this.currentImage)
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i ;
        if (this.currentImage >= images.length) {
            i = images.length-1;
        } else {
            i = this.currentImage;// % images.length;
        }
        let path = images[i]
        this.img = this.imageCache[path]
        //console.log(this.img)
        this.currentImage++;


        // if (this instanceof Character) console.log(this.currentImage)
    }

    jump() {
        this.speedY = 40;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
        // console.log("last hit " + this.lastHit);

    }

    isHurt() { //vergleicht lasthit mit aktueller zeit, true so lange differenz kleiner als 1 sekunde ist
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed < 1;

    }
    isDead() { // wenn energy 0 dann kommt true zurück
        return this.energy == 0;
    }
}