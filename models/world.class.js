class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    throwableObjects = []


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

    checkThrowObject(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x+100, this.character.y+100)
            bottle.world = this;
            this.throwableObjects.push(bottle)
            bottle.throw();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            };
        });
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                // console.log("Collision Endboss")
            };
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
        this.addToMap(this.statusBar)
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