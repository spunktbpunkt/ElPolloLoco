class Coins extends MovableObject {
    height = 110;
    width = this.height / 98 * 95;
    y = 100;
    offset = {
        top: 37,
        bottom: 37,
        left: 37,
        right: 75
    }

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
    }
}









