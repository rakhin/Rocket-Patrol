class Rocket2 extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene, x, y, texture, frame); 

        scene.add.existing(this);
        this.isFiring = false; 

        this.sfxRocket = scene.sound.add('sfx_rocket');

    }
   update(){
      
           if(keyLEFT.isDown && this.x >= 47){ //change the # values for x/y
               console.log("left");
               this.x -= 2; 
           } else if(keyRIGHT.isDown && this.x <= 578){
               console.log("right");
               this.x += 2; 
           }
       
       if(Phaser.Input.Keyboard.JustDown(keyF)){
           this.isFiring = true;
           this.sfxRocket.play(); 
       }
       if(this.isFiring && this.y >= 108){
           this.y -= 2; 

       }
       //reset on miss
       if(this.y <= 108){
           this.isFiring = false; 
           this.y = 431; 
       }
   }

   //reset rocket to original position
   reset(){
       this.isFiring = false; 
       this.y = 431; 
   }
}