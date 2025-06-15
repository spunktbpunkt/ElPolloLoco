class MovableObject {
    x = 100;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    ground = 180;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }



    isAboveGround() {
        return this.y < this.ground;
    }


    loadImage(path) {
        this.img = new Image(); //this.img = document.getelementById('image') - <img id='image' src="">
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    showFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    // character.isColiding(chicken)
    // isColliding(mo) {
    //     return this.x + this.width - this.offset.right> mo.x + mo.offset.left&&
    //         this.y + this.height - this.offset.bottom> mo.y + mo.offset.top&&
    //         this.x + this.offset.left < mo.x + mo.offset.left &&
    //         this.y + this.offset.top < mo.y + mo.height;
    // }
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }
    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % this.images_walking.length;// let i = 6 % 6; => 1, Rest 0 // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    walkingSound() {
        this.walking_sound.volume = 0.5;
        this.walking_sound.playbackRate = 2;
        this.walking_sound.play();
    }
}