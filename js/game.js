let canvas;
// let ctx;
let world;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log('my charater is ', world.character)


    
    // ctx = canvas.getContext('2d')

    // character.src = '../img/2_character_pepe/2_walk/W-21.png'
    // ctx.drawImage(character,20,20,50,150)

    // ctx.drawImage(world.character.img,world.character.x,world.character.y,50, 150)

}