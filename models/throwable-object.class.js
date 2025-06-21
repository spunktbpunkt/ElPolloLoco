class ThrowableObject extends MovableObject {
    speedX = 10;
    speedY = 10;
    gravity = 1.5;
    throwDirection = false; // Speichert Blickrichtung beim Wurf

    constructor(x, y, character) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throwDirection = character.otherDirection; // Blickrichtung speichern
        this.applyGravity();
        this.animateThrow();
        this.throw();
    }

    throw() {
        this.speedY = 30;

        // Entscheide Flugrichtung basierend auf throwDirection
        const interval = setInterval(() => {
            this.x += this.throwDirection ? -this.speedX : this.speedX;

            // if (this.y > 500 || this.x < 0 || this.x > 2000) {
            //     clearInterval(interval); // Entferne die Bottle aus dem Spiel, wenn sie zu weit fliegt
            // }
        }, 1000 / 60);
    }

    animateThrow() {
        // Rotation oder Animation bei Bedarf
    }
}
