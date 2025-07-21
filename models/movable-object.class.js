class MovableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
    ground = 135;
    speedY = 0;
    acceleration = 4;
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


    /**
    * Applies gravity physics to the object.
    * 
    * @returns {void}
    */
    applyGravity() {
        if (isPaused) return;
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

    /**
     * Removes gravity and resets all movement speeds to zero.
     * 
     * @returns {void}
     */
    removeGravity() {
        if (isPaused) { return }
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.x += 0
    }

    /**
     * Checks if object is above ground.
     * 
     * @returns {boolean} True if above ground, false if on ground
     */
    isAboveGround() {
        if (isPaused) { return }
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 130
        }
    }

    /**
     * Moves object to the right with their own speed value.
     * 
     * @returns {void}
     */
    moveRight() {
        if (isPaused) { return }
        this.x += this.speed;
    }

    /**
     * Moves object to the left with their own speed value.
     * 
     * @returns {void}
     */
    moveLeft() {
        if (isPaused) { return }
        this.x -= this.speed;
    }

    /**
     * Plays looping animation from image array.
     * 
     * @param {string[]} images - Array of image paths
     * @returns {void}
     */
    playAnimation(images) {
        if (isPaused) return;
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays animation once and stops at the last frame.
     * 
     * @param {string[]} images - Array of image paths
     * @returns {void}
     */
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

    /**
     * Makes the object jump by setting upward speed.
     * 
     * @returns {void}
     */
    jump() {
        this.speedY = 40;
    }

    /**
     * Checks collision with another movable object using bounding boxes.
     * 
     * @param {MovableObject} mo - Object to check collision with
     * @returns {boolean} True if objects are colliding
     */
    isColliding(mo) {
        if (isPaused) { return }
        return this.outerLines.right > mo.outerLines.left &&
            this.outerLines.left < mo.outerLines.right &&
            this.outerLines.bottom > mo.outerLines.top &&
            this.outerLines.top < mo.outerLines.bottom;
    }

    /**
     * Reduces energy by 10 if not hit recently.
     * 
     * @returns {void}
     */
    hit() {
        if (isPaused) return;

        if (!this.sinceLastHit()) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Checks if object was hit within the last second.
     * 
     * @returns {boolean} True if hit recently, false otherwise
     */
    sinceLastHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if object was hurt within the last second.
     * 
     * @returns {boolean} True if hurt recently, false otherwise
     */
    isHurt() { //vergleicht lasthit mit aktueller zeit, true so lange differenz kleiner als 1 sekunde ist
        if (isPaused) return;
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed < 1;

    }

    /**
     * Checks if object is dead and updates world state accordingly.
     * 
     * @returns {boolean} True if energy is zero, false otherwise
     */
    isDead() {
        if (isPaused) return;
        let myValue = this.energy == 0;
        if (this instanceof Character && myValue) {
            this.world.characterDead = true;
        }
        if (this instanceof Endboss && myValue) {
            this.world.endbossDead = true;
        }
        return myValue;
    }

    /**
     * Plays walking sound if not muted or paused.
     * 
     * @returns {void}
     */
    walkingSound() {
        if (isPaused || soundMuted) return;
        if (!this.muted) {
            this.walking_sound.play();
        }
    }

    /**
     * Plays audio element with specified volume.
     * 
     * @param {HTMLAudioElement} element - Audio element to play
     * @param {number} [volume=1] - Volume level (0-1)
     * @param {number|null} [intervalId=null] - Interval ID to clear on sound end
     * @returns {void}
     */
    playSound(element, volume = 1, intervalId = null) {
        if (isPaused || soundMuted) return;
        if (!this.muted) {
            element.addEventListener('ended', () => {
                clearInterval(intervalId);
            });
            element.volume = volume;
            element.play();
        }
    }
}