class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwablObjects = [];
    statusBarEnergy = new Statusbar('energy');
    statusBarBottles = new Statusbar('bottle');
    statusBarCoins = new Statusbar('coin');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(
                this.character.x + this.character.width - 50,
                this.character.y + 100
            );
            this.throwablObjects.push(bottle);
        }
    }

    checkCollisions() {
        // === Gegner-Kollision ===
        this.level.enemies.forEach((enemy, index) => {
            this.character.definingOffsetFrame();
            enemy.definingOffsetFrame();

            // Gegner isDead-Flag standardmäßig false (falls nicht gesetzt)
            if (enemy.isDead === undefined) enemy.isDead = false;

            if (this.character.isColliding(enemy)) {
                if (this.character.falling && this.character.y < enemy.y && !enemy.isDead) {
                    // Gegner "stirbt" – Bild ändern
                    enemy.img = enemy.image_dead;
                    enemy.isDead = true;  // Gegner als tot markieren

                    // Nach 0,5 Sekunde entfernen
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                } else if (!enemy.isDead) {
                    // Normale Kollision -> Schaden nur wenn Gegner noch lebt
                    this.character.hit();
                    this.statusBarEnergy.setPercentage(this.character.energy, 100);
                }
            }
        });

        // === Coin-Kollision ===
        this.level.coins.forEach((coin, index) => {
            this.character.definingOffsetFrame();
            coin.definingOffsetFrame();

            if (this.character.isColliding(coin)) {
                this.character.coinsAmount++;
                this.statusBarCoins.setPercentage(this.character.coinsAmount, 5);
                this.level.coins.splice(index, 1);
            }
        });

        // === Bottle-Kollision ===
        this.level.bottles.forEach((bottle, index) => {
            this.character.definingOffsetFrame();
            bottle.definingOffsetFrame();

            if (this.character.isColliding(bottle)) {
                this.character.bottlesAmount++;
                this.statusBarBottles.setPercentage(this.character.bottlesAmount, 5);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwablObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // draw wird immer wieder neu aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.showFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}
