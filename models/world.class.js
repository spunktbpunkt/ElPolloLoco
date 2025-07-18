class World {
    coolDown = 250;
    gameEnd = false;
    isPaused = false;
    characterDead = false;
    endbossDead = false;
    animationFrameId = null;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;

        this.character = new Character();
        this.throwableObjects = [];

        this.statusBarEnergy = new Statusbar('energy');
        this.statusBarBottles = new Statusbar('bottle');
        this.statusBarCoins = new Statusbar('coin');
        this.statusBarEndboss = new Statusbar('endboss');

        this.lastThrowTime = 0;
        this.now = 0;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {

            // check collisions
            this.checkCollisions();
            this.checkThrowObject();
            // keyboard input

        }, 100);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.checkCoolDown() && this.character.bottlesAmount > 0) {
            this.lastThrowTime = this.now;

            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            bottle.world = this;
            this.throwableObjects.push(bottle)
            bottle.throw();
            this.character.bottlesAmount--;
            this.statusBarBottles.setPercentage(this.character.bottlesAmount, 5);
            if (this.character.bottlesAmount === 0 && this.level.bottles.length == 0) {
                console.log('adding new bottles')
                this.level.bottles.push(...createElements('bottles', 5, 200, 100));
            }
        }
    }

    checkCollisions() {
        if (!this.gameEnd) {
            this.characterCollisionEnemy()
            this.characterCollisionEndboss()
            this.characterCollisionCoin()
            this.characterCollisionBottle()
            // this.characterCollisionBottle()
        }
    }

    characterCollisionEnemy() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            this.character.definingOffsetFrame();
            enemy.definingOffsetFrame();

            if (enemy.isDead === undefined) enemy.isDead = false;

            if (this.character.isColliding(enemy)) {
                if (this.character.falling && this.character.y < enemy.y && !enemy.isDead) {
                    // Gegner töten
                    enemy.loadImages(enemy.images_dead);
                    enemy.img = enemy.imageCache[enemy.images_dead[0]];
                    enemy.isDead = true;
                    // console.log(enemy.img);


                    // Entferne Gegner (außer Boss) nach 0,5 Sek.
                    if (!enemy.isBoss) {
                        setTimeout(() => {
                            this.level.enemies.splice(i, 1);
                        }, 500);
                    }
                } else if (!enemy.isDead) {
                    // } else if (!enemy.isDead && !this.character.sinceLastHit()) {
                    // Schaden bekommen
                    // console.log(this.character.sinceLastHit())
                    this.character.hit();
                    this.statusBarEnergy.setPercentage(this.character.energy, 100);
                }
            }
        }
    }
    // characterCollisionEnemy() {
    // this.level.enemies.forEach(enemy => {
    //     if (this.character.isColliding(enemy)) {
    //         this.character.hit();
    //         this.statusBarEnergy.setPercentage(this.character.energy)
    //     };
    // });
    // }

    characterCollisionBottle() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            let bottle = this.level.bottles[i];
            this.character.definingOffsetFrame();
            bottle.definingOffsetFrame();

            if (this.character.isColliding(bottle)) {
                this.character.bottlesAmount++;
                this.statusBarBottles.setPercentage(this.character.bottlesAmount, 5);
                this.level.bottles.splice(i, 1);
            }
        }
    }
    characterCollisionCoin() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];
            this.character.definingOffsetFrame();
            coin.definingOffsetFrame();

            if (this.character.isColliding(coin)) {
                this.character.coinsAmount++;
                this.statusBarCoins.setPercentage(this.character.coinsAmount, 5);
                this.level.coins.splice(i, 1);
            }
        }
    }



    characterCollisionEndboss() {
        this.level.endboss.forEach(endboss => {
            this.character.definingOffsetFrame();
            endboss.definingOffsetFrame();
            if (this.character.isColliding(endboss) && !endboss.isDead) {
                this.character.hit();
                this.statusBarEnergy.setPercentage(this.character.energy)
            };
        });
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach(bottle => {
            this.bottleCollisionEnemy(bottle);
            this.bottleCollisionEndboss(bottle);
        });
    }

    bottleCollisionEnemy(bottle) {
        this.level.enemies.forEach(enemy => {
            enemy.definingOffsetFrame();
            bottle.definingOffsetFrame();
            if (bottle.isColliding(enemy)) {
                enemy.die();
                bottle.bottleSplash();
            }
        });
    }

    bottleCollisionEndboss(bottle) {
        if (this.checkCoolDown()) {
            this.lastThrowTime = this.now;

            this.level.endboss.forEach(endboss => {
                endboss.definingOffsetFrame();
                bottle.definingOffsetFrame();
                if (bottle.isColliding(endboss)) {
                    endboss.hit();              // ✅ Treffer registrieren
                    bottle.bottleSplash();      // Flaschenanimation
                }
            });
        }
    }



    checkCoolDown() {
        this.now = Date.now();
        return (this.now - this.lastThrowTime >= this.coolDown);
    }

    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            enemy.animate();
        });

        this.level.endboss.forEach(endboss => {
            endboss.world = this;
            endboss.animate();
        });

        this.level.clouds.forEach(cloud => {
            cloud.world = this;
        });
    }

    draw() {
        if (this.gameEnd) {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);

        if (this.level.endboss[0]?.hadFirstContact) {
            this.addToMap(this.statusBarEndboss);
        }

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        if (isPaused) return;

        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    // draw() {
    //     // console.log(gameStarted)
    //     // if(!gameStarted) return;
    //     if (this.gameEnd && this.characterDead) {
    //         console.log('you lose')
    //         youLose();
    //         return;
    //     };
    //     if (this.gameEnd && this.endbossDead) {
    //         console.log('you win')
    //         setTimeout(() => {
    //             youWin();
    //             return;
    //         }, 5000);
    //     };
    //     //Zeichenflaeche leeren
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    //     this.ctx.translate(this.camera_x, 0);
    //     this.addObjectsToMap(this.level.backgroundObjects)
    //     this.addObjectsToMap(this.level.clouds);

    //     this.ctx.translate(-this.camera_x, 0);
    //     // space for fixed objects
    //     this.addToMap(this.statusBarEnergy)
    //     this.addToMap(this.statusBarBottles);
    //     this.addToMap(this.statusBarCoins);
    //     let endboss = this.level.endboss;
    //     if (endboss && endboss[0].hadFirstContact) {
    //         this.addToMap(this.statusBarEndboss);
    //     }

    //     this.ctx.translate(this.camera_x, 0);

    //     this.addToMap(this.character)
    //     this.addObjectsToMap(this.level.coins);
    //     this.addObjectsToMap(this.level.bottles);
    //     this.addObjectsToMap(this.level.enemies);
    //     this.addObjectsToMap(this.level.endboss);
    //     this.addObjectsToMap(this.throwableObjects);

    //     this.ctx.translate(-this.camera_x, 0);


    //     if (isPaused) { return };
    //     // erneutes aufrufen von draw()
    //     let self = this;
    //     requestAnimationFrame(function () {
    //         self.draw();
    //     });
    // }



    addObjectsToMap(array) {
        array.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.drawing(this.ctx)
        // mo.drawingFrame(this.ctx)


        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }



}