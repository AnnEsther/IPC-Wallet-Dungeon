
class testingScene extends Phaser.Scene {
    constructor(ind) {
        super('testing');
    }
    init (data)
    {
        this.levels = data.levelData;
        this.levels.shift();
        this.index = 0;
        this.ownIPCs = data.ownedIPCs;
        //console.log('index', this.index);
    }
    preload() {
       //Preloading mini maps
        for (var i = 0; i < this.levels.length; i++)
        {
            this.load.image(this.levels[i], 'assets/MiniMaps/' + this.levels[i] + '.jpg');
        }
        //preloading hole
        this.load.image('hole', 'assets/hole.png');
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.levelData = this.cache.json.get('mapData_floors');
        
    }

    create() {

        this.startX = 0;
        this.startY = 0;
        this.ipcInHole = false;
        this.genNPC = false;

        this.keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.tabActive = false;

        this.dungeonData = new DungeonData(this, this.levels);

         //SOUNDS
         this.loop1 = this.sound.add('loop1');
         this.loop2 = this.sound.add('loop2');
         this.loop1.setLoop(true);
         this.loop2.setLoop(true);
         this.loop1.setVolume(0.5);
         this.loop2.setVolume(0.5);

         if (this.checkAllMapValid()) {
            return;
        }
        //this.cameras.main.fadeOut(0);

        this.updateMusic();

        this.dungeonLevel = this.levels[this.index];
       
        //Setting the cursors up for keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        //Camera centering data
        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;



         //creating the map
         this.dynamicMap = this.make.tilemap(
            {
                // data: this.levelData[this.levels[this.index]],
                 tileWidth: 250,
                 tileHeight: 250
            });

        const tiles = this.dynamicMap.addTilesetImage('graph', null, 250, 250);

        this.layer0 = this.dynamicMap.createBlankLayer('layer0', tiles, 0, 0, 18, 18);
        this.layer0.putTilesAt(this.levelData[this.levels[this.index]][0], 0, 0);

        this.layer2t = this.dynamicMap.createBlankLayer('layer2t', tiles, 0, 0, 18, 18);
        this.layer2t.putTilesAt(this.levelData[this.levels[this.index]]['1t'], 0, 0);

        this.generateIPC();

        this.layer1 = this.dynamicMap.createBlankLayer('layer1', tiles, 0, 0, 18, 18);
        this.layer1.putTilesAt(this.levelData[this.levels[this.index]][2], 0, 0);

        this.layer3 = this.dynamicMap.createBlankLayer('layer3', tiles, 0, 0, 18, 18);
        this.layer3.putTilesAt(this.levelData[this.levels[this.index]][3], 0, 0);

        this.layer4 = this.dynamicMap.createBlankLayer('layer4', tiles, 0, 0, 18, 18);
        this.layer4.putTilesAt(this.levelData[this.levels[this.index]][4], 0, 0);


        this.layer2b = this.dynamicMap.createBlankLayer('layer2b', tiles, 0, 0, 18, 18);
        this.layer2b.putTilesAt(this.levelData[this.levels[this.index]]['1b'], 0, 0);

        this.layer5 = this.dynamicMap.createBlankLayer('layer5', tiles, 0, 0, 18, 18);
        this.layer5.putTilesAt(this.levelData[this.levels[this.index]][5], 0, 0);

        this.layer6 = this.dynamicMap.createBlankLayer('layer6', tiles, 0, 0, 18, 18);
        this.layer6.putTilesAt(this.levelData[this.levels[this.index]][6], 0, 0);

        

        this.dynamicMap.setCollision([1]);
        
        this.layer0.setCollisionByProperty({ collides: true })
        
        this.physics.world.setBounds(0, 0, this.layer0.width, this.layer0.height, true, true, true, true);
        this.cameras.main.setBounds(0, 0, this.layer0.width, this.layer0.height);
        
        var width = 250;
        var height = 250;
        var tiledMap_w = width * 18;
        var tiledMap_h = height * 18;

        var ratioW = tiledMap_w/(this.cameras.main.width * 60/100);
        var ratioH = tiledMap_h/(this.cameras.main.height);

        var r = ratioW > ratioH ? ratioW : ratioH;
        r = 1/r;

        this.cameras.main.setZoom(0.25,0.25);

        // this.nextButton = this.add.button(this.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);

        // this.nextButton.onInputOver.add(over, this);
        // this.nextButton.onInputOut.add(out, this);
        // this.nextButton.onInputUp.add(up, this);


        var name = this.add.text((this.cameras.main.width * 1/r *80/100), 1000, 'LEVEL : ' +  this.levels[this.index], { fill: '#0f0' });
        name.setScale(10);
        name.setOrigin(0.5,0);

        //console.log(this.levels[this.index]);
        var mapImage = this.add.image((this.cameras.main.width * 1/r *80/100), 2000, this.levels[this.index]);
        mapImage.setScale(2);

        this.nextButton = new BasicButton({
            'scene': this,
            'key': 'button',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': 0,
            'y': 0
        });
        this.nextBouttonScale = 4;
        this.nextButton.setScale(this.nextBouttonScale);
        this.nextButton.on('pointerdown', this.actionOnClick, this);

        this.nextButton.x = (this.cameras.main.width * 1/r *80/100) ;//- (this.nextButton.width * this.nextBouttonScale);
        this.nextButton.y = mapImage.y + mapImage.width + (this.nextButton.height * this.nextBouttonScale);

       

        // this.nextButton.setInteractive().on('pointerdown', () => this.updateClick(++this.index));

    }

    actionOnClick () {
        this.index += 1;
        this.scene.start('testing', { i : this.index});
    }

    checkAllMapValid() {
        var i = 0;
        while (i < 20) 
        {
            if (this.cache.json.get('mapData')[this.levels[i]] == null) 
            {
                console.log("Map not found : " + this.levels[i]);
                return true;
            }
            i++;
        }
        return false;
    }

    updateMusic() {
        if (this.currentIndex % 2 == 0) 
        {
            this.loop1.play();
            this.loop2.stop();
        }
        else
        {
            this.loop2.play();
            this.loop1.stop();
        }
    }

    generateIPC()
    {
        var position  = this.dungeonData.GetHoleposition(this.dungeonLevel);
        
        this.hole = this.add.sprite(
            (position.x * 250) + (250/2),
            (position.y * 250) + (250/2),
            'hole');
            
        position = this.dungeonData.GetIPCposition(this.dungeonLevel);
        this.ipc = new IPC(this,
            (position.x * 250) + (250/3),
            (position.y * 250) + (250/3),
            this.ownIPCs[0],
            this.ipcAddedCallback.bind(this),
            this.cursors);

        this.ipc.setScale(0.5);

        this.physics.add.overlap(this.ipc, this.hole, this.coll);


        this.cameras.main.centerOn((position.x * 250) + (250/2),
         (position.y * 250) + (250/2));

        this.ipcInHole = false;
    }

    ipcAddedCallback() {
        //this.time.addEvent({ delay: 250, callback: this.delayDone, callbackScope: this, loop: false });
    }

    delayDone() {


        this.ipc.setCollideWorldBounds(true, 0, 0);
        this.ipc.setSize(this.ipc.width * 0.5, this.ipc.height * 0.8, true);

        this.physics.add.collider(this.ipc, this.layer0);

        this.cameras.main.startFollow(this.ipc, true, 0.1, 0.1);
        this.cameras.main.fadeIn(250);

    }
    // updateClickCountText(index) {
    //     // this.index
    //     this.nextButton.setText(`Button has been clicked ${clickCount} times.`);
        
    // }

}

