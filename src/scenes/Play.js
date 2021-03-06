class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png'); 
        this.load.image('rocket2', './assets/rocket2.png'); 
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('asteroid', './assets/asteroid.png');
        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9
        }); 
    }
    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0); 

        //white rect boarders
        this.add.rectangle(5, 5, 630, 32, 0xFACADE).setOrigin(0,0); 
        this.add.rectangle(5, 5, 32, 470, 0xFACADE).setOrigin(0,0); 
        this.add.rectangle(603, 5, 32, 470, 0xFACADE).setOrigin(0,0); 

        //grn UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0); 
    
        //Player 1
        this.p1Rocket = new Rocket(this, game.config.width/4, 431,'rocket') 
        .setScale(0.5, 0.5,).setOrigin(0,0);
        this.p2Rocket = new Rocket2(this, game.config.width/4, 431,'rocket2') 
        .setScale(0.5, 0.5,).setOrigin(0,0);
        

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30)
        .setOrigin(0,0); 
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20)
        .setOrigin(0,0); 
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10)
        .setOrigin(0,0);  
        this.asteroid = new Spaceship(this, game.config.width + 300, 320, 'asteroid', 0, 0)
        .setOrigin(0,0);  
        this.asteroid1 = new Spaceship(this, game.config.width + 150, 320, 'asteroid', 0, 0)
        .setOrigin(0,0);

        //Player1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, 
                end: 9, 
                first: 0
            }), 
            frameRate: 30 
        }); 

        //keeping score
        this.playerScore = 0; 

        //implement player 1 score and player 2 score

        //displaying score
        let scoreConfig = { 
            fontFamily: ' Courier', 
            fontSize: '28px',
            backgroundColor: "#F3B141", 
            color: '#843605', 
            align: 'right', 
            padding: {
                top:5, 
                bottom:5, }, 

            fixedWidth:100
        }
        this.scoreLeft = this.add.text(69, 54, this.playerScore,scoreConfig); 
        scoreConfig.fixedWidth = 0;

        this.gameOver = false; 

        //60sec clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this); 

    }

    update(){
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //scroll background
        this.starfield.tilePositionX -= 4; 

        if(!this.gameOver){
        this.p1Rocket.update();
        this.p2Rocket.update(); 

        this.ship01.update(); 
        this.ship02.update(); 
        this.ship03.update();

        this.asteroid.update();
        this.asteroid1.update(); 
        }
        
        //player 1
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.asteroid)){
            this.p1Rocket.reset();
            this.shipExplode(this.asteroid);
        }
        if(this.checkCollision(this.p1Rocket, this.asteroid1)){
            this.p1Rocket.reset();
            this.shipExplode(this.asteroid1);
        }


        //player2 
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.asteroid)){
            this.p2Rocket.reset();
            this.shipExplode(this.asteroid);
        }
        if(this.checkCollision(this.p2Rocket, this.asteroid1)){
            this.p2Rocket.reset();
            this.shipExplode(this.asteroid1);
        }
        
    }

    checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width 
            && rocket.x + rocket.width > ship.x
            && rocket.y < ship.y + ship.height 
            && rocket.height + rocket.y > ship.y){
                return true;
            }   else {
                return false; 
            }
    }

    shipExplode(ship){
        ship.alpha = 0; //temp hides ship

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0); 
        boom.anims.play('explode');                 //play animation
        boom.on('animationcomplete', () => {        //do this after animation completes
            ship.reset();                           //reset ship
            ship.alpha = 1;                         //made visible again    
            boom.destroy();                         //remove explode sprite
        });

        //score
        this.playerScore += ship.points; 
        this.scoreLeft.text = this.playerScore; 

        this.sound.play('sfx_explosion'); 
    }

}