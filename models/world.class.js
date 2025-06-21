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
    statusBarEndboss = new Statusbar('endboss')

    newBottle = createElements('bottles', 1, 100, 100)

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
        if (this.keyboard.D && this.character.bottlesAmount != 0) {
            let bottleX;
            if (this.character.otherDirection) {
                bottleX = this.character.x - 50;
            } else {
                bottleX = this.character.x + this.character.width - 50;
            }

            let bottle = new ThrowableObject(
                bottleX,
                this.character.y + 100,
                this.character
            );

            this.character.bottlesAmount--;
            this.statusBarBottles.setPercentage(this.character.bottlesAmount, 5);
            this.throwablObjects.push(bottle);

            if (this.character.bottlesAmount === 0) {
                this.spawnMultipleBottles(5);
            }
        }
    }



    spawnMultipleBottles(count) {
        for (let i = 0; i < count; i++) {
            this.spawnNewBottle();
        }
    }


    spawnNewBottle() {
        const buffer = 100;
        const bottleWidth = 80;
        const levelEnd = this.level.level_end_x - bottleWidth - buffer;
        const mapStart = 0 + buffer;

        const rightMinX = this.character.x + 200;
        const rightMaxX = Math.min(this.character.x + 600, levelEnd);

        if (rightMinX < rightMaxX) {
            const randomX = Math.random() * (rightMaxX - rightMinX) + rightMinX;
            const bottle = new Bottles();
            bottle.x = randomX;
            // bottle.y = 480 - bottle.height - 45; // falls Höhe gesetzt werden muss
            this.level.bottles.push(bottle);
            return;
        }

        // Dann links vom Charakter
        const leftMaxX = this.character.x - 200;
        const leftMinX = Math.max(this.character.x - 600, mapStart);

        if (leftMinX < leftMaxX) {
            const randomX = Math.random() * (leftMaxX - leftMinX) + leftMinX;
            const bottle = new Bottles();
            bottle.x = randomX;
            // bottle.y = 480 - bottle.height - 45;
            this.level.bottles.push(bottle);
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
                    // Gegner "stirbt" – Bilder laden und Bild setzen
                    enemy.loadImages(enemy.images_dead);
                    enemy.img = enemy.imageCache[enemy.images_dead[0]];
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


    checkBottleHitsEnemies() {
        this.throwablObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {

                bottle.definingOffsetFrame();
                enemy.definingOffsetFrame();

                if (bottle.isColliding(enemy)) {

                    // Chicken wird getroffen
                    if (enemy instanceof Chicken) {
                        this.throwablObjects.splice(bottleIndex, 1);

                        enemy.loadImages(enemy.images_dead);
                        enemy.img = enemy.imageCache[enemy.images_dead[0]];
                        enemy.isDead = true;

                        setTimeout(() => {
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 1000);
                    }

                    // Endboss wird getroffen, aber nur wenn attack == true
                    if (enemy instanceof Endboss && enemy.attack === true) {
                        this.throwablObjects.splice(bottleIndex, 1);
                        this.reduceEndbossEnergy();
                    }
                }
            });
        });
    }





reduceEndbossEnergy() {
    if (!this.statusBarEndboss) return;

    // Aktuellen Wert berechnen
    let current = (this.statusBarEndboss.percentage / 100) * this.statusBarEndboss.max;
    current = Math.max(0, current - 20); // min. 0

    this.statusBarEndboss.setPercentage(current, 100);

    // Endboss töten und entfernen, wenn Energie 0 ist
    if (current === 0) {
        // Endboss finden (angenommen nur ein Endboss im enemies-Array)
        let endbossIndex = this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
        if (endbossIndex !== -1) {
            // Optional: Endboss „tot“ markieren oder Animation starten
            let endboss = this.level.enemies[endbossIndex];
            endboss.isDead = true;

            // Endboss nach kurzer Zeit entfernen (z.B. 1 Sekunde)
            setTimeout(() => {
                this.level.enemies.splice(endbossIndex, 1);
            }, 500);

            // Statusbar ggf. ausblenden oder entfernen
            this.statusBarEndboss = null;
        }
    }
}


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.attack) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwablObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.checkBottleHitsEnemies();

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
