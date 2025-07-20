let level1;

function createLevel() {
    return new Level(
        [
            ...createElements('chicken', 3,300,50),
            ...createElements('chickensmall', 3,300,50),
        ],
        [
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
            ...createElements('coins', 5,150,50)
        ],
        [ 
            ...createElements('bottles',5,200,75)
        ]
    );
}

function createElements(type, count,startX,minDistance, options = {}) {
    const {
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
                case 'chickensmall':
                    element = new Chickensmall();
                    break;
                case 'coins':
                    element = new Coins();
                    break;
                case 'bottles':
                    element = new Bottles();
                    break;
                // weitere Typen nach Bedarf
                default:
                    throw new Error(`Unbekannter Elementtyp: ${type}`);
            }
            if((this instanceof Coins)){element.x = randomX};
            element.x = randomX;
            elements.push(element);
        }
    }

    return elements;
}
