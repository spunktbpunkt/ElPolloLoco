class Character extends MovableObject {
    height = 350;
    width = this.height / 7 * 4;
    y = 480 - this.height - 45;

    images_walking = ['img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
        ];
    
    

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImage % this.images_walking.length; // let i = 6 % 6; => 1, Rest 0
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
            let path = this.images_walking[i]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    jump() {
        console.log('jump')
    }
}