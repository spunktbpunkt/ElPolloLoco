class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 325;
    height = 100;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // gleiche wie <img>
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        });
    }

    drawing(ctx) {
        if (this.type === 'endboss') {
            ctx.save();
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1); // Spiegelt das Bild horizontal
            ctx.drawImage(this.img, 0, 0, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
    // drawing(ctx) {
    //     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    // }

    drawingFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            // ctx.rect(
            //     this.x,
            //     this.y,
            //     this.width,
            //     this.height
            // );
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}