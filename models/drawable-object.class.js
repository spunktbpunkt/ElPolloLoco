class DrawableObject {
    x = 100;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

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

    definingOffsetFrame() {
        this.outerLines.left = this.x + this.offset.left
        this.outerLines.right = this.x + this.width - this.offset.right;
        this.outerLines.top = this.y + this.offset.top;
        this.outerLines.bottom = this.y + this.height - this.offset.bottom;
    }

    showFrame(ctx) {
        if (this instanceof Character
            || this instanceof Chicken
            || this instanceof Endboss
            || this instanceof Coins
        ) {
            this.definingOffsetFrame();
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.outerLines.left,
                this.outerLines.top,
                this.outerLines.right - this.outerLines.left,
                this.outerLines.bottom - this.outerLines.top
            );
            ctx.stroke();
        }
    }
}