/**
 * Handles character animation states
 * 
 * @returns {void}
 */
Character.prototype.animation = function() {
    if (isPaused) return;
    this.currentImageOnce = 0;
    if (!this.frameCounter) this.frameCounter = 0;
    this.animationInterval = setInterval(() => {
        this.frameCounter++;
        this.handleKeyboardInput();
        this.handleGameEndCheck();
        this.selectAnimation();
    }, 50);
}

/**
 * Handles keyboard input tracking
 * 
 * @returns {void}
 */
Character.prototype.handleKeyboardInput = function() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.D) {
        this.lastKeyboardHit = new Date().getTime();
        this.stopSnorring();
    }
}

/**
 * Checks game end state and stops snoring
 * 
 * @returns {void}
 */
Character.prototype.handleGameEndCheck = function() {
    if (this.world && this.world.gameEnd) {
        this.stopSnorring();
    }
}

/**
 * Selects appropriate animation based on character state
 * 
 * @returns {void}
 */
Character.prototype.selectAnimation = function() {
    if (this.isDead()) {
        this.handleDeadAnimation();
    } else if (this.isHurt()) {
        this.handleHurtAnimation();
    } else if (this.isAboveGround()) {
        this.handleJumpFallAnimation();
    } else {
        this.handleGroundAnimation();
    }
}

/**
 * Handles death animation and game over
 * 
 * @returns {void}
 */
Character.prototype.handleDeadAnimation = function() {
    this.playAnimationOnce(this.images_dead);
    clearInterval(this.movingInterval);
    this.playSound(this.die_sound, soundVolume, this.animationInterval);
    setTimeout(() => {
        youLose();
    }, 1000);
}

/**
 * Handles hurt animation and sound
 * 
 * @returns {void}
 */
Character.prototype.handleHurtAnimation = function() {
    this.playAnimation(this.images_hurt);
    this.playSound(this.hurt_sound, soundVolume);
    this.lastKeyboardHit = new Date().getTime();
    this.stopSnorring();
}

/**
 * Handles jump and fall animations
 * 
 * @returns {void}
 */
Character.prototype.handleJumpFallAnimation = function() {
    if (this.falling) {
        this.currentImageOnce = 0;
        this.fallAnimation();
    } else {
        this.currentImageOnce = 0;
        this.jumpAnimation();
    }
}

/**
 * Handles ground-based animations
 * 
 * @returns {void}
 */
Character.prototype.handleGroundAnimation = function() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.images_walking);
    } else {
        this.handleIdleStates();
    }
}

/**
 * Manages different idle states based on time
 * 
 * @returns {void}
 */
Character.prototype.handleIdleStates = function() {
    let timeSinceLastInput = new Date().getTime() - this.lastKeyboardHit;
    if (timeSinceLastInput > 5500) {
        this.handleLongIdle();
    } else if (timeSinceLastInput > 500) {
        this.handleNormalIdle();
    } else {
        this.handleStillState();
    }
}

/**
 * Handles long idle animation with snoring
 * 
 * @returns {void}
 */
Character.prototype.handleLongIdle = function() {
    if (this.frameCounter % 4 === 0) {
        this.playAnimation(this.images_longidle);
    }
    if (this.snorring_sound && this.snorring_sound.paused) {
        this.playSound(this.snorring_sound, soundVolume);
    }
}

/**
 * Handles normal idle animation
 * 
 * @returns {void}
 */
Character.prototype.handleNormalIdle = function() {
    if (this.frameCounter % 3 === 0) {
        this.playAnimation(this.images_idle);
    }
}

/**
 * Handles still state animation
 * 
 * @returns {void}
 */
Character.prototype.handleStillState = function() {
    this.loadImage(this.images_idle[0]);
}

/**
 * Handles jump animation sequence
 * 
 * @returns {void}
 */
Character.prototype.jumpAnimation = function() {
    if (isPaused) return;
    clearInterval(this.animationInterval)
    this.jumpInterval = setInterval(() => {
        if (!this.falling) {
            this.playAnimationOnce(this.images_jumping)
        } else {
            clearInterval(this.jumpInterval)
            this.animation()
        }
    }, 50);
}

/**
 * Handles fall animation sequence
 * 
 * @returns {void}
 */
Character.prototype.fallAnimation = function() {
    if (isPaused) return;
    clearInterval(this.animationInterval)
    this.fallInterval = setInterval(() => {
        if (this.falling) {
            this.playAnimationOnce(this.images_falling)
        } else {
            clearInterval(this.fallInterval)
            this.animation()
        }
    }, 50);
}