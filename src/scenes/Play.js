class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load sprites
        //this.load.image('name', './folder/filename');
    }
    create(){
        //place tile sprite
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0); 

        //white rect boarders
        this.add.rectangle(5, 5, 630, 32, 0xFACADE).setOrigin(0,0); 
        this.add.rectangle(5, 443, 630, 32, 0xFACADE).setOrigin(0,0); 
        this.add.rectangle(5, 5, 32, 455, 0xFACADE).setOrigin(0,0); 
        this.add.rectangle(603, 5, 32, 455, 0xFACADE).setOrigin(0,0); 

        //grn UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0); 
    }

    update(){
        //scroll background
        //this.starfields.tilePositionX -= 4; 
    }
}