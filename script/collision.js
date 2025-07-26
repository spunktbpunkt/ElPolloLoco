/**
 * Checks different types of Collisions
 * 
 */
function checkCollisions() {
    if (!this.gameEnd) {
        characterCollisionEnemy()
        characterCollisionEndboss()
        characterCollisionCoin()
        characterCollisionBottle()
    }
}

/**
 * Checks if the character is colliding with a normal enemy by comparing the frames of the images from the character an all enemies
 * 
 */
function characterCollisionEnemy() {
    // console.log(world.character)
    for (let i = world.level.enemies.length - 1; i >= 0; i--) {
        let enemy = world.level.enemies[i];
        world.character.definingOffsetFrame();
        enemy.definingOffsetFrame();

        if (enemy.isDead === undefined) enemy.isDead = false;

        if (world.character.isColliding(enemy) && !enemy.isDead) {
            if (world.character.falling && world.character.y < enemy.y) {
                world.killEnemy(enemy, i);
                // this.killEnemy(enemy, i);
            } else {
                world.character.hit();
                world.statusBarEnergy.setPercentage(world.character.energy, 100);
            }
        }
    }
}

/**
 * Checks if the character is colliding with the endboss by comparing the frames of the images from the character an the endboss
 * 
 */
function characterCollisionEndboss() {
    world.level.endboss.forEach(endboss => {
        world.character.definingOffsetFrame();
        endboss.definingOffsetFrame();
        if (world.character.isColliding(endboss) && !endboss.isDead) {
            world.character.hit();
            world.statusBarEnergy.setPercentage(world.character.energy)
        };
    });
}

/**
 * This method checks if the character is colliding with the coins in the air and adds them to the statusbar
 * 
 */
function characterCollisionCoin() {
    for (let i = world.level.coins.length - 1; i >= 0; i--) {
        let coin = world.level.coins[i];
        world.character.definingOffsetFrame();
        coin.definingOffsetFrame();

        if (world.character.isColliding(coin)) {
            world.character.coinsAmount++;
            world.character.playSound(world.coin_sound, soundVolume)
            world.statusBarCoins.setPercentage(world.character.coinsAmount, 5);
            world.level.coins.splice(i, 1);
        }
    }
}

/**
 * This method checks if the character is colliding with the bottles on the floor and adds them to the statusbar
 * 
 */
function characterCollisionBottle() {
    for (let i = world.level.bottles.length - 1; i >= 0; i--) {
        let bottle = world.level.bottles[i];
        world.character.definingOffsetFrame();
        bottle.definingOffsetFrame();

        if (world.character.isColliding(bottle)) {
            world.character.bottlesAmount++;
            world.statusBarBottles.setPercentage(world.character.bottlesAmount, 5);
            world.level.bottles.splice(i, 1);
        }
    }
}

/**
 * Checks the collision between the thrown bottles and the enemies/endboss
 * 
 */
function checkBottleCollisions() {
    world.throwableObjects.forEach(bottle => {
        bottleCollisionEnemy(bottle);
        bottleCollisionEndboss(bottle);
    });
}

/**
 * Starts another methods for each enemy in the array level.enemies which are needed for checking collisions
 * 
 * @param {object} bottle 
 */
function bottleCollisionEnemy(bottle) {
    world.level.enemies.forEach(enemy => {
        enemy.definingOffsetFrame();
        bottle.definingOffsetFrame();
        if (bottle.isColliding(enemy)) {
            enemy.die();
            bottle.bottleSplash();
        }
    });
}

/**
 * Starts another methods for each endboss in the array level.endboss which are needed for checking collisions
 * 
 * @param {object} bottle 
 */
function bottleCollisionEndboss(bottle) {
    if (world.checkCoolDown()) {
        world.lastThrowTime = world.now;
        world.level.endboss.forEach(endboss => {
            endboss.definingOffsetFrame();
            bottle.definingOffsetFrame();
            if (bottle.isColliding(endboss)) {
                endboss.hit();
                bottle.bottleSplash();
            }
        });
    }
}