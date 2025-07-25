/**
 * Handles character movement based on keyboard input
 * 
 * @returns {void}
 */
Character.prototype.moving = function() {
    if (isPaused) return;
    this.movingInterval = setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.movingRight()
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.movingLeft()
        }
        if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
            this.movingJumping()
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
}

/**
 * Moves character right with sound
 * 
 * @returns {void}
 */
Character.prototype.movingRight = function() {
    this.otherDirection = false;
    this.playSound(this.walking_sound, soundVolume);
    this.moveRight();
}

/**
 * Moves character left with sound
 * 
 * @returns {void}
 */
Character.prototype.movingLeft = function() {
    this.otherDirection = true;
    this.playSound(this.walking_sound, soundVolume);
    this.moveLeft();
}

/**
 * Makes character jump with sound
 * 
 * @returns {void}
 */
Character.prototype.movingJumping = function() {
    this.playSound(this.jump_sound, soundVolume);
    this.jump();
}