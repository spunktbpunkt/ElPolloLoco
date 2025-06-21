class Character extends MovableObject {
    height = 250;
    width = this.height / 7 * 4;
    y = 480 - this.height - 45; //480
    speed = 10;
    offset = {
        top: 95,
        bottom: 12,
        left: 22,
        right: 22
    }
    falling = false;
    gravityInterval;

    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    walking_sound = new Audio('audio/footstep2.mp3');
    world;



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);

        this.applyGravity();  // Nur hier aufrufen
        this.animate();
    }

    applyGravity() {
        if (this.gravityInterval) return; // Wenn schon läuft, nicht nochmal starten

        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                // Damit der Character nicht "unter" den Boden fällt
                this.speedY = 0;
                this.y = this.ground;
            }

            this.falling = this.speedY < 0;
            // Optional: Debug
            // console.log('speedY:', this.speedY.toFixed(2), 'falling:', this.falling);
        }, 1000 / 25);
    }

    animate() {
        setInterval(() => {
            let leftBoundary = -120;
            let rightBoundary = this.world.level.level_end_x + 500;
            let minFocusX = 0;
            let maxFocusX = this.world.level.level_end_x;

            if (this.world.keyboard.RIGHT && this.x < rightBoundary) {
                this.walkingSound();
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > leftBoundary) {
                this.walkingSound();
                this.otherDirection = true;
                this.moveLeft();
            }
            if (!this.isAboveGround() && (this.world.keyboard.SPACE || this.world.keyboard.UP)) {
                this.jump();
            }

            

            if (this.x >= minFocusX && this.x <= maxFocusX) {
                this.world.camera_x = -this.x + 100;
            }



        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
                // Nur lesen:
                // this.falling ist aktuell gesetzt von applyGravity()
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.images_walking);
            }
        }, 50);
    }

    // animate() {

    //     setInterval(() => {
    //         if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
    //             this.walkingSound();
    //             this.otherDirection = false;
    //             this.moveRight();
    //         }
    //         if (this.world.keyboard.LEFT && this.x > 0) {
    //             this.walkingSound();
    //             this.otherDirection = true;
    //             this.moveLeft();
    //         }
    //         if (!this.isAboveGround() && (this.world.keyboard.SPACE || this.world.keyboard.UP)) {
    //             this.jump()
    //         }
    //         this.world.camera_x = -this.x + 100;

    //     }, 1000 / 60);

    //     setInterval(() => {
    //         if (this.isDead()) {
    //             this.playAnimation(this.images_dead);
    //         } else if (this.isHurt()) {
    //             this.playAnimation(this.images_hurt);
    //         } else if (this.isAboveGround()) {
    //             this.playAnimation(this.images_jumping);
    //             if (this.falling) {
    //                 // Hier kannst du spezielle Effekte für das Fallen einbauen, falls gewünscht
    //             }
    //         } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //             this.playAnimation(this.images_walking);
    //         }
    //     }, 50);


    // }


}