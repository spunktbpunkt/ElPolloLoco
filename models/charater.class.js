class Character extends MovableObject {
    height = 350;
    width = this.height / 7 * 4;
    y = 480 - this.height - 45;
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

    }


    jump() {
        console.log('jump')
    }
}