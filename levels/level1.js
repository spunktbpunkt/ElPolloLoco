    let level1;

    function createLevel() {
        return new Level(
            [
                ...createElements('chicken', 5, 500, 50),
                ...createElements('chickensmall', 3, 500, 50),
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
                new BackgroundObject('img/5_background/layers/air.png', 720 * 3, 0),
                new BackgroundObject('img/5_background/layers/air.png', 720 * 4, 0),
                new BackgroundObject('img/5_background/layers/air.png', 720 * 5, 0),
                new BackgroundObject('img/5_background/layers/air.png', 720 * 6, 0),

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
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),

                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3, 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3, 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3, 0),

                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4, 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4, 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4, 0),

                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 5, 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 5, 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 5, 0),

                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 6, 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 6, 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 6, 0)

            ]
            ,
            [
                ...createElements('coins', 5, 150, 50)
            ],
            [
                ...createElements('bottles', 5, 200, 75)
            ]
        );
    }

    /**
     * Creates game elements with minimum distance between them
     * 
     * @param {string} type - Element type (chicken, chickensmall, coins, bottles)
     * @param {number} count - Number of elements to create
     * @param {number} startX - Starting X position
     * @param {number} minDistance - Minimum distance between elements
     * @param {Object} options - Additional options
     * @param {number} options.range - Range for random X positioning
     * @returns {Array} Array of created elements
     */
    function createElements(type, count, startX, minDistance, options = {}) {
        const { range = 1000 } = options;
        const elements = [];

        while (elements.length < count) {
            const randomX = generateValidPosition(elements, startX, range, minDistance);
            if (randomX !== null) {
                const element = createElement(type);
                element.x = randomX;
                elements.push(element);
            }
        }
        return elements;
    }

    /**
     * Generates valid X position with minimum distance check
     * 
     * @param {Array} elements - Existing elements
     * @param {number} startX - Starting X position
     * @param {number} range - Position range
     * @param {number} minDistance - Minimum distance required
     * @returns {number|null} Valid position or null if not found
     */
    function generateValidPosition(elements, startX, range, minDistance) {
        const randomX = startX + Math.random() * range;

        for (let el of elements) {
            if (Math.abs(el.x - randomX) < minDistance) {
                return null;
            }
        }
        return randomX;
    }

    /**
     * Creates element instance based on type
     * 
     * @param {string} type - Element type
     * @returns {Object} Created element instance
     */
    function createElement(type) {
        const elementMap = {
            'chicken': () => new Chicken(),
            'chickensmall': () => new Chickensmall(),
            'coins': () => new Coins(),
            'bottles': () => new Bottles()
        };

        if (!elementMap[type]) {
            throw new Error(`Unknown element type: ${type}`);
        }

        return elementMap[type]();
    }
