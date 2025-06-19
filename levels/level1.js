let level1;

function initLevel() {
    level1 = new Level(
        [
            ...createElements('chicken', 3,300),
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -720, 0),
            new BackgroundObject('img/5_background/layers/air.png', 0, 0),
            new BackgroundObject('img/5_background/layers/air.png', 720, 0),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 2, 0),

            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720, 0),

            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 0),

            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2, 0)

        ]
        ,
        [
            ...createElements('coins', 7,150)
        ]
    );
}

function createElements(type, count,startX, options = {}) {
    const {
        minDistance = 50,
        range = 1000
    } = options;

    const elements = [];

    while (elements.length < count) {
        let valid = true;
        let randomX = startX + Math.random() * range;

        for (let el of elements) {
            if (Math.abs(el.x - randomX) < minDistance) {
                valid = false;
                break;
            }
        }

        if (valid) {
            let element;
            switch (type) {
                case 'chicken':
                    element = new Chicken();
                    break;
                case 'coins':
                    element = new Coins();  // oder `new Coin()` je nach Klassennamen
                    break;
                // weitere Typen nach Bedarf
                default:
                // throw new Error(`Unbekannter Elementtyp: ${type}`);
            }
            element.x = randomX;
            elements.push(element);
        }
    }

    return elements;
}
