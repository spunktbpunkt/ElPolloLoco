class Statusbar extends DrawableObject {

    images_energy = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/10.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/30.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/50.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/70.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/90.png',
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

    images_energy_endboss = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    percentage = 100;
    currentImages = [];
    type;
    max = 100;

    constructor(type) {
        super();
        this.type = type;

        switch (type) {
            case 'bottle':
                this.bottleStatusbar()
                break;
            case 'coin':
                this.coinStatusbar()
                break;
            case 'endboss':
                this.endbossStatusbar()
                break;
            default:
                this.defaultStatusbar()
                break;
        }

        this.width = 200;
        this.height = 60;
    }

    bottleStatusbar() {
        this.currentImages = this.images_bottles;
        this.loadImages(this.currentImages);
        this.setPercentage(0, 5); 
        this.x = 20;
        this.y = 50;
    }

    coinStatusbar() {
        this.currentImages = this.images_coins;
        this.loadImages(this.currentImages);
        this.setPercentage(0, 5);
        this.x = 20;
        this.y = 100;
    }

    endbossStatusbar() {
        this.currentImages = this.images_energy_endboss;
        this.loadImages(this.currentImages);
        this.setPercentage(100, 100);
        this.updateEndbossPosition();
        this.y = 50;
    }

    defaultStatusbar() {
        this.currentImages = this.images_energy;
        this.loadImages(this.currentImages);
        this.setPercentage(100, 100);
        this.x = 20;
        this.y = 0;
    }

    /**
     * Updates endboss statusbar position based on canvas size
     */
    updateEndbossPosition() {
        const canvas = document.getElementById('canvas');
        if (canvas) {
            this.x = canvas.width - 220; 
        } else {
            this.x = 500;
        }
    }

    /**
    * Updates the status bar percentage and corresponding image.
    * 
    * @param {number} current - Current value
    * @param {number} [max=100] - Maximum value for percentage calculation
    * @returns {void}
    */
    setPercentage(current, max = 100) {
        this.percentage = (current / max) * 100;
        this.max = max;
        let path = ''
        if(this.type == 'energy'){
            path = this.currentImages[this.resolveImageIndexHealth()];
        }else{
            path = this.currentImages[this.resolveImageIndex()];
        }
        this.img = this.imageCache[path];
    }

    /**
     * Returns the appropriate image index based on current percentage.
     * 
     * @returns {number} Image index (0-10) corresponding to percentage ranges
     */
    resolveImageIndexHealth() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 10) {
            return 1
        } else if (this.percentage == 20) {
            return 2
        } else if (this.percentage == 30) {
            return 3
        } else if (this.percentage == 40) {
            return 4
        } else if (this.percentage == 50) {
            return 5
        } else if (this.percentage == 60) {
            return 6
        } else if (this.percentage == 70) {
            return 7
        } else if (this.percentage == 80) {
            return 8
        } else if (this.percentage == 90) {
            return 9
        } else {
            return 10
        }
    }

    /**
     * Returns the appropriate image index based on current percentage.
     * 
     * @returns {number} Image index (0-5) corresponding to percentage ranges
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 10) {
            return 1
        } else if (this.percentage == 20) {
            return 1
        } else if (this.percentage == 30) {
            return 2
        } else if (this.percentage == 40) {
            return 2
        } else if (this.percentage == 50) {
            return 3
        } else if (this.percentage == 60) {
            return 3
        } else if (this.percentage == 70) {
            return 4
        } else if (this.percentage == 80) {
            return 4
        } else if (this.percentage == 90) {
            return 5
        } else {
            return 5
        }
    }
}