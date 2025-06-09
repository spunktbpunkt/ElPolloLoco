class MovableObject {
    x = 100;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;

    // loadImage('img/test.png')
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

    // moveRight(element, speed) {
        // console.log('move right ' + element)
        // element.x = element.x + speed;
    // }
    moveRight() {
        setInterval(() => {
            this.x += this.speed
        }, 1000 / 120)
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / 120)
    }

    playAnimation(images) {
        let i = this.currentImage % this.images_walking.length;// let i = 6 % 6; => 1, Rest 0 // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}