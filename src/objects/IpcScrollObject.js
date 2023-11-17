
class IpcScrollObject extends Phaser.GameObjects.GameObject {
    constructor(scene, ipcList, maxWidth, clickFunction)
	{
        super(scene, "IpcScroll");
        this.scene = scene;
        this.ipcList = ipcList;
        this.maxWidth = maxWidth;

        var colors = {
            background : 0x81828C, // 0x9896d3,
            border :  0x373D4D, //0x3833a6,
            shadow: 0x000000
        };
        
        var borderWidth = 6;

        this.border = this.scene.add.rectangle(scene.cameras.main.width - (this.maxWidth * 0.5), 0, this.maxWidth * 0.95, scene.cameras.main.height, colors.border).setOrigin( 0.5, 0);

        this.moveObjs = new Array();
      
        this.generateIPCbuttons();

        this.upBtn = new BasicButton({
            'scene': scene,
            'key': 'upBtn',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': this.border.x,
            'y': 0
        });
        this.upBtn.on('pointerdown', this.actionOnClick_upBtn, this);
        this.upBtn.y += this.upBtn.height * 0.5;
        //this.upBtn.disableInteractive();


        this.downBtn = new BasicButton({
            'scene': scene,
            'key': 'downBtn',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': this.border.x,
            'y': scene.cameras.main.height
        });
        this.downBtn.on('pointerdown', this.actionOnClick_downBtn, this);
        this.downBtn.y -= this.upBtn.height * 0.5;
        if(this.moveObjs[this.moveObjs.length-1].y < this.scene.cameras.main.height)
        {
            //this.downBtn.disableInteractive();
        }

        var currPos = this.moveObjs[0].y - (this.moveObjs[0].height * 0.5);
        var reqPos = this.upBtn.y ;//+ (this.upBtn.height*0.5);
        this.updateY(reqPos - currPos);

        
    }

    actionOnClick_upBtn()
    {
        this.updateY(-this.ipcHeight);
    }

    actionOnClick_downBtn()
    {
        this.updateY(this.ipcHeight);
    }

    actionOnClick_ipc(object)
    {
        var ipcId = object.getData("id");
        this.scene.setIPC(ipcId);
    }


    setScrollFactor(x, y) {
    }

    setDepth(zIndex) {
    }


    setMask(mask)
    {
        for(var x in this.moveObjs)
        {
            this.moveObjs[x].setMask(mask);
        }
        //this.border.setMask(mask);
    }

    updateY(newY)
    {
        for(var x in this.moveObjs)
        {
            this.moveObjs[x].y += newY;
        }
        // this.border.y += newY;
    }

    generateIPCbuttons(){
         
        var numIPCs = this.ipcList.length;

        var startX = this.border.x;
        var startY = 0;

        var scale = 0.5;

        for(var i in this.ipcList)
        {
            var ipc = this.ipcList[i];

            // this.scene.anims.create({
            //     key: ipc + '_running',
            //     frameRate: 10,
            //     frames: this.scene.anims.generateFrameNumbers('ipc'+ipc, { starts: 0, ends: 7 }),
            //     repeat: -1
            // });

            var rect = this.scene.add.rectangle( 0, 0, 10, 10, 0x385DBB).setAlpha(0.5);

            var ipcSprite = this.scene.add.sprite(startX, startY, 'ipc'+ipc);
            ipcSprite.setData('id' , ipc);

            startY += (ipcSprite.height * 0.51 );

            // ipcSprite.y = startY;

            ipcSprite.setInteractive();
            ipcSprite.on('pointerdown', this.actionOnClick_ipc.bind(this, ipcSprite), this);
            ipcSprite.setScale(scale);
            // function (pointer)
            // {
            //     console.log("clicked !");
            //     this.setTint(0xff0000);
                
            // });
            ipcSprite.setCrop(0, 0, ipcSprite.width * 0.8, ipcSprite.height * 0.5);
            
            rect.setPosition(ipcSprite.x - (ipcSprite.width * 0.3), ipcSprite.y - (ipcSprite.height * 0.5));
            rect.setSize(ipcSprite.width * 0.6, ipcSprite.height * 0.5);
            rect.setOrigin(0, 0);

            this.moveObjs.push(ipcSprite);
            this.moveObjs.push(rect);

        }

        this.ipcHeight = this.moveObjs[0].height * 0.5;

    }
}

