class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    // ground = 180;
    ground = 60;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coinsAmount = 0;
    bottlesAmount = 0;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    outerLines = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }



    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable object should always fall
            // return this.y < 350;
            return true;
        } else {
            return this.y < this.ground;
        }

    }


    isColliding(mo) {
        let CA = [this.outerLines.left, this.outerLines.right, this.outerLines.top, this.outerLines.bottom];
        let EN = [mo.outerLines.left, mo.outerLines.right, mo.outerLines.top, mo.outerLines.bottom];
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // DIFFERENCE IN MS
        timePassed = timePassed / 1000; //DIFFERENCE IN S
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }
    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;// let i = 6 % 6; => 1, Rest 0 // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    walkingSound() {
        this.walking_sound.volume = 0.5;
        this.walking_sound.playbackRate = 2;
        this.walking_sound.play();
    }
}