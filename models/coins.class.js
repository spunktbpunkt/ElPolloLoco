class Coins extends MovableObject{
        height = 110;
    width = this.height / 98 * 95;
    y = 100;
    // x = 1000;
        offset = {
        top: 37,
        bottom: 37,
        left: 37,
        right: 37
    }

        constructor() {
            super().loadImage('img/8_coin/coin_1.png');
            this.x = 100 + Math.random() * 2000+10;
    }


}