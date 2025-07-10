class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x = 1500

    constructor(enemies, endboss, clouds, backgroundObjects,coins,bottles){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}