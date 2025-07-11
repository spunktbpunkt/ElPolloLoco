class MovableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
    ground = 135;
    speedY = 0; // Geschwindigkeit nach unten
    acceleration = 4; // Beschleinigung
    coinsAmount = 0;
    bottlesAmount = 0;
    energy = 100;
    lastHit = 0;
    gravityInterval;
    outerLines = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    playAnimationOnceInterval;
    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration
    //         }
    //     }, 50);
    // }

    applyGravity() {
        // if (isPaused) return;
        if (this.gravityInterval) return;

        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.falling = this.speedY < 0;
            } else {
                this.speedY = 0;
                this.falling = false;
                this.y = this.ground;
            }
        }, 1000 / 25);
    }

    removeGravity() {
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
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i;
        if (this.currentImageOnce >= images.length) {
            i = images.length - 1;
            this.currentImageOnce == 0
            if(!(this instanceof Character))clearInterval(this.animationInterval)
        } else {
            i = this.currentImageOnce;// % images.length;
        }
        let path = images[i]
        this.img = this.imageCache[path]
        console.log(this.img)
        this.currentImageOnce++;
    }

    jump() {
        this.speedY = 40;
    }

    isColliding(mo) {
        return this.outerLines.right > mo.outerLines.left &&
            this.outerLines.left < mo.outerLines.right &&
            this.outerLines.bottom > mo.outerLines.top &&
            this.outerLines.top < mo.outerLines.bottom;
    }




    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }

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