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
        if (isPaused) return;
        console.log(isPaused)
        if (this.gravityInterval) return;

        this.gravityInterval = setInterval(() => {
            if (isPaused) return;
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
        if (isPaused) { return }
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.x += 0
    }

    isAboveGround() {
        if (isPaused) { return }
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 130
        }
    }



    moveRight() {
        if (isPaused) { return }
        this.x += this.speed;
    }

    moveLeft() {
        if (isPaused) { return }
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
        if (isPaused) return;
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    playAnimationOnce(images) {
        if (isPaused) return;
        let i;
        if (this.currentImageOnce >= images.length) {
            i = images.length - 1;
            this.currentImageOnce == 0
            if (!(this instanceof Character)) clearInterval(this.animationInterval)
        } else {
            i = this.currentImageOnce;// % images.length;
        }
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImageOnce++;
    }

    jump() {
        this.speedY = 40;
    }

    isColliding(mo) {
        if (isPaused) { return }
        return this.outerLines.right > mo.outerLines.left &&
            this.outerLines.left < mo.outerLines.right &&
            this.outerLines.bottom > mo.outerLines.top &&
            this.outerLines.top < mo.outerLines.bottom;
    }




    hit() {
        if (isPaused) return;
        // console.log(this.lastHit)
        // console.log("differenz: " + ((new Date().getTime() - this.lastHit)/1000))
        // console.log(new Date().getTime())
        if (!this.sinceLastHit()) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0
                this.world.gameEnd = true;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
        console.log(this.energy)
    }
    // hit() {
    //     if (isPaused) return;
    //     // console.log(this.lastHit)
    //     // console.log("differenz: " + ((new Date().getTime() - this.lastHit)/1000))
    //     // console.log(new Date().getTime())
    //     this.energy -= 10;
    //     if (this.energy < 0) {
    //         this.energy = 0
    //     } else {
    //         this.lastHit = new Date().getTime();
    //     }

    // }

    sinceLastHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed < 1;
    }

    isHurt() { //vergleicht lasthit mit aktueller zeit, true so lange differenz kleiner als 1 sekunde ist
        if (isPaused) return;
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in Sekunden
        // console.log(timePassed)
        return timePassed < 1;

    }

    isDead() {
        if (isPaused) return;
        let myValue = this.energy == 0;
        if (this instanceof Character && myValue) {
            this.world.gameEnd = true;
            this.world.characterDead = true;
        }
        if (this instanceof Endboss && myValue) {
            this.world.gameEnd = true;
            this.world.endbossDead = true;
        }
        return myValue;
    }

    walkingSound() {
        if (isPaused || soundMuted) return;
        if (!this.muted) {
            this.walking_sound.play();
        }
    }


    playSound(element, intervalId = null) {
        if (isPaused || soundMuted) return;
        if (!this.muted) {
            element.addEventListener('ended', () => {
                clearInterval(intervalId);
            });
            element.play();
        }
    }
}