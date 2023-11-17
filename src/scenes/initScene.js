
class initScene extends Phaser.Scene {
    constructor() {
        super('init');
    }

    //DATA FROM FORM SCENE
    init() {
      
    }

    preload() {
        
        const timestamp_start = Date.now();
        
        this.load.json('loadAssets', 'assets/loadAssets.json');
        this.load.spritesheet('loadAnim', 'assets/sprites/load.png',  { frameWidth: 78, frameHeight: 78, endFrame:3 });//450, 469, 76);

        const timestamp_end = Date.now();

        console.log("loadingScene : " + (timestamp_end-timestamp_start) + " ms");
       
    }

    create() {

        this.scene.start("loadingScene");
        
    }

}
