class MovableObject {
    x = 100;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    
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

    moveRight(element, speed) {
        // console.log('move right ' + element)
        element.x = element.x + speed;
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / 120)
    }
}