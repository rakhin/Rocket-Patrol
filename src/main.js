/* Mods:
 1. Create New Artwork for All in-game assets (25)
 2. Mouse Control for Player Movement + Firing (25) 
 3. Created Own Mod: Asteroid Obstacles (15. Got the idea from the new weapon mod but there no new behaviors so I took 10 points off) 
 4. Allow the player to control Rocket after Firing (10) 
 5. Created Own Mod: Two Player Simultaneous Co-op (25. Only 25 because I didn't have time to implement the full 50 points version)  */


let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play], 

};
let game = new Phaser.Game(config); 

let keyF, keyLEFT, keyRIGHT; //PLayer 2



game.settings = {
    spaceshipSpeed: 3,
     gameTimer: 60000
}
