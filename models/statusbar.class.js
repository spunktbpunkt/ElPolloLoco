class Statusbar extends DrawableObject {

    images_energy = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    images_bottles = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    images_coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    percentage = 100;
    currentImages = [];
    type;
    max = 100; // Default max

    constructor(type) {
        super();
        this.type = type;

        switch (type) {
            case 'bottle':
                this.currentImages = this.images_bottles;
                this.loadImages(this.currentImages);
                this.setPercentage(0, 5); // z.B. max 5 Flaschen
                this.x = 20;
                this.y = 50;
                break;
            case 'coin':
                this.currentImages = this.images_coins;
                this.loadImages(this.currentImages);
                this.setPercentage(0, 5);
                this.x = 20;
                this.y = 100;
                break;
            case 'endboss':
                this.currentImages = this.images_energy;
                this.loadImages(this.currentImages);
                this.setPercentage(100, 100); // Health: 0–100%
                this.x = 500;
                this.y = 0;
                break;
            default:
                this.currentImages = this.images_energy;
                this.loadImages(this.currentImages);
                this.setPercentage(100, 100); // Health: 0–100%
                this.x = 20;
                this.y = 0;
                break;
        }

        // if(type == 'endboss'){this.x = 500}else{this.x = 20}
        this.width = 200;
        this.height = 60;
    }

    //setPercentage(50)
    setPercentage(current, max = 100) {
        this.percentage = (current / max) * 100;
        this.max = max;
        const path = this.currentImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }
    }

}