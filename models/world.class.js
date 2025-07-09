class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarEnergy = new Statusbar('imagesEnergy',100);
    // statusBarBottle = new Statusbar();
    // statusBarCoin = new Statusbar();
    throwableObjects = []
    bottle;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
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

        }, 300);
    }

    checkThrowObject() {
        // console.log("checkThrowObject")
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            bottle.world = this;
            this.throwableObjects.push(bottle)
            console.log(this.throwableObjects[0].img)
            bottle.throw();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarEnergy.setPercentage(this.character.energy)
            };
        });
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                // console.log("Collision Endboss")
            };
        });
    }

checkBottleCollisions() {
    this.throwableObjects.forEach(bottle => {
        this.level.enemies.forEach(enemy => {
            if (bottle.isColliding(enemy)) {
                // console.log('Bottle hit enemy:', enemy);

                bottle.bottleSplash()
                // Optional: Gegner entfernen, Flasche entfernen, Explosion auslösen etc.
            }
        });

        this.level.endboss.forEach(endboss => {
            if (bottle.isColliding(endboss)) {
                // console.log('Bottle hit endboss:', endboss);
                bottle.bottleSplash()
                // Endboss schaden, Animation, etc.
            }
        });
    });
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


    // setWorld() {
    //     this.character.world = this;
    // }

    draw() {
        //Zeichenflaeche leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0);
        // space for fixed objects
        this.addToMap(this.statusBarEnergy)
        // space for fixed objects
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        // erneutes aufrufen von draw()
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }



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
        mo.drawingFrame(this.ctx)


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