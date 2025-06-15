class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    // ground = 185;
    camera_x = 0;
    statusBarEnergy = new Statusbar('energy');
    statusBarBottles = new Statusbar('bottle');
    statusBarCoins = new Statusbar('coin');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        // this.statusBarEnergy.y = 0;
        // this.statusBarBottles.y = 50;
        // this.statusBarCoins.y = 50;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarEnergy.setPercentage(this.character.energy)
                }
            })
        }, 200);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0);
        // space for fixed objects
        this.addToMap(this.statusBarEnergy)
        this.addToMap(this.statusBarBottles)
        this.addToMap(this.statusBarCoins)
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
        this.ctx.translate(-this.camera_x, 0);

        // draw wird immer wieder neu aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx)
        mo.showFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }



    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}