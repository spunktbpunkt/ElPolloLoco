class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    currentImageOnce = 0;
    x = 120;
    y = 325;
    height = 100;
    width = 100;

    /**
     * Loads a single image from path
     * 
    * @param {string} path - Image file path
    * @returns {void}
    */
    loadImage(path) {
        this.img = new Image(); // gleiche wie <img>
        this.img.src = path;
    }

    /**
     * Loads multiple images into cache
     * 
     * @param {string[]} array - Array of image file paths
     * @returns {void}
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        });
    }

    /**
     * Draws the object on canvas context
     * 
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @returns {void}
     */
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

    /**
     * Draws collision frame around object
     * 
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @returns {void}
     */
    drawingFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chickensmall || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins || this instanceof Bottles) {
            this.definingOffsetFrame();
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    /**
     * Calculates collision boundaries with offset
     * 
     * @returns {void}
     */
    definingOffsetFrame() {
        this.outerLines.left = this.x + this.offset.left
        this.outerLines.right = this.outerLines.left + this.width - this.offset.right;
        this.outerLines.top = this.y + this.offset.top;
        this.outerLines.bottom = this.y + this.height - this.offset.bottom;
    }
}