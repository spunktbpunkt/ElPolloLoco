class Character extends MovableObject {
    height = 350;
    width = 150;
    y = 90;
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

    }


    jump() {
        console.log('jump')
    }
}