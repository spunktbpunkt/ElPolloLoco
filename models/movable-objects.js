class MovableObject{
    x = 100;
    y = 300;
    img;
    height = 150;
    width = 100;

    // loadImage('img/test.png')
    loadImage(path){    
        this.img = new Image(); //this.img = document.getelementById('image') - <img id='image' src="">
        this.img.src = path;
    }
    moveRight() {
        console.log('moving right')
    }
    moveLeft() {
        console.log('move Left')
    }
}