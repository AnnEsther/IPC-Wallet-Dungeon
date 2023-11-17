
class landingScene extends Phaser.Scene {
    constructor() {
        super('landingScene');
    }
    preload() {
        
    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);

        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        this.anims.create({
            key: 'playLogoAnim',
            frames: this.anims.generateFrameNumbers('logoAnim', { start: 0, end: 72}),
            frameRate: 35,
            repeat: 0
        });

        this.logoAnim = this.add.sprite(this.centerX, this.centerY, 'logoAnim').play('playLogoAnim');
        var logo = this.add.image(this.centerX, this.centerY, 'logo');

        this.logoAnim.y = this.centerY - (this.logoAnim.height * 0.25);
        logo.y = this.logoAnim.y + (this.logoAnim.height * 0.5) + (logo.height * 0.5);

        var background = new Phaser.Display.Color(0, 44, 43);
        this.cameras.main.setBackgroundColor(background);

        var ratio = this.cameras.main.width / logo.width;

        //logo.setScale(ratio);


        

        this.logoAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE,
            function () {
                //this.logoAnim.anims.stop();
                this.cameras.main.fadeOut(100, 0, 0, 0);
        
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    var data = {
                        "loadScene" : "form"
                    };
                    this.scene.start('loadingScene', data);
                    //this.scene.start('loading');
                    //this.scene.start('testing', { i : 0});
                });
        }, this);

    }

}
