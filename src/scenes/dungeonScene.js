
class dungeonScene extends Phaser.Scene {
    constructor() {
        super('dungeon');
    }

    //DATA FROM FORM SCENE
    init(data) {
        this.ownIPCs = data.ownedIPCs;
        this.levels = data.levelData;
        this.dungeonAddress = data.dungeonAddress;
        this.currentIndex = data.index;
        this.dungeonData = data.dungeonData;
        this.inputData = data;

    }

    preload() {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.levelData = this.cache.json.get('mapData_floors');
    }
    create() {

        this.startX = 0;
        this.startY = 0;

        this.ipcSpeed = 400;
        
        this.ipcInHole = false;
        this.genNPC = false;

        this.keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.tabActive = false;

        
        this.cameras.main.fadeOut(0); 
        
        this.updateMusic();

        this.dungeonLevel = this.levels[this.currentIndex];
        
        this.createMap(); 

        this.generateUI();


        this.input.on('pointerup', function (pointer) {
            var tile = this.dynamicMap.getTileAtWorldXY(pointer.worldX, pointer.worldY, true, this.cameras.main, this.layer0);
            if(tile.index == 0)
            {
                console.log(pointer.worldX, pointer.worldY, this.ipc.x, this.ipc.y);
                // this.ipc.moveTo(pointer.worldX, pointer.worldY);

                this.tweens.addCounter({
                    from: this.ipc.x,
                    to: pointer.worldX,
                    duration: 1000,
                    ease: 'linear',
                    onUpdate: tween =>
                    {
                        this.ipc.x = tween.getValue();
                    }
                });
                this.tweens.addCounter({
                    from: this.ipc.y,
                    to: pointer.worldY,
                    duration: 1000,
                    ease: 'linear',
                    onUpdate: tween =>
                    {
                        this.ipc.y = tween.getValue();
                    }
                });
            }
            
          }, this);
        
        
       
    }

    

    generateIPC()
    {
        var position  = this.dungeonData.GetHoleposition(this.dungeonLevel);
        
        this.hole = this.add.sprite(
            (position.x * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2),
            (position.y * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2),
            'hole');
            
        position = this.dungeonData.GetIPCposition(this.dungeonLevel);
        this.ipc = new IPC(this,
            (position.x * gameConfig.Tile_Size) + (gameConfig.Tile_Size/3),
            (position.y * gameConfig.Tile_Size) + (gameConfig.Tile_Size/3),
            this.inputData['ipcSelected'],
            this.ipcAddedCallback.bind(this),
            this.cursors);

        this.ipc.setScale(0.5);

        this.physics.add.overlap(this.ipc, this.hole, this.coll);


        this.cameras.main.centerOn((position.x * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2),  
        (position.y * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2));

        

        this.ipcInHole = false;
    }

    generateUI()
    {
        var width = this.cameras.main.width;

        this.levelHUDSystem = new Level_HUD(this, this.levels, width * 0.2 * 0.95);
        this.levelHUDSystem.setScrollFactor(0,0);
        this.levelHUDSystem.setDepth(100);

        this.levelHexDisplay = new Level_Hex(this, this.levels, width * 0.8);
        this.levelHexDisplay.setScrollFactor(0,0);
        this.levelHexDisplay.setDepth(100);
    }

    generateNPC() {
        this.npc = [];

        for(var i = 0; i < this.ownIPCs.length && i < 10; i++)
        {
            if(this.ownIPCs[i] == this.inputData['ipcSelected'])
            {
                continue;
            }
            var pos = this.dungeonData.GetIPCposition(this.dungeonLevel);
            var tempNpc = new IPC(this, 
                (pos.x * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2),
                (pos.y * gameConfig.Tile_Size) + (gameConfig.Tile_Size/2),
                this.ownIPCs[i], this.npcCallBack.bind(this));
            tempNpc.setScale(0.5);
            this.npc.push(tempNpc);
            this.layer0.setTileIndexCallback(1, this.hitwall, this);

            var interval = Math.random() * 10000//(5000 - 2000) + 2000;
            interval = (interval < 5000) ? 5000 : interval;
            setInterval(this.changeDirection, interval, tempNpc);
    
        }
       
    }

    

   
    createMap() {
        
        this.dynamicMap = this.make.tilemap(
            {
                data: this.levelData[this.levels[this.currentIndex]][0],
                tileWidth: 250,
                tileHeight: 250,
                width: 18,
                height: 18,
            });
        const tiles = this.dynamicMap.addTilesetImage('graph', 'graph', 250, 250);

        this.layer0 = this.dynamicMap.createBlankLayer('layer0', tiles, 0, 0, 18, 18);
        this.layer0.putTilesAt(this.levelData[this.levels[this.currentIndex]][0], 0, 0);

        this.layer2t = this.dynamicMap.createBlankLayer('layer2t', tiles, 0, 0, 18, 18);
        this.layer2t.putTilesAt(this.levelData[this.levels[this.currentIndex]]['1t'], 0, 0);

        this.generateIPC();

        this.generateNPC();

        this.layer1 = this.dynamicMap.createBlankLayer('layer1', tiles, 0, 0, 18, 18);
        this.layer1.putTilesAt(this.levelData[this.levels[this.currentIndex]][2], 0, 0);

        this.layer3 = this.dynamicMap.createBlankLayer('layer3', tiles, 0, 0, 18, 18);
        this.layer3.putTilesAt(this.levelData[this.levels[this.currentIndex]][3], 0, 0);

        this.layer4 = this.dynamicMap.createBlankLayer('layer4', tiles, 0, 0, 18, 18);
        this.layer4.putTilesAt(this.levelData[this.levels[this.currentIndex]][4], 0, 0);

        
        this.layer2b = this.dynamicMap.createBlankLayer('layer2b', tiles, 0, 0, 18, 18);
        this.layer2b.putTilesAt(this.levelData[this.levels[this.currentIndex]]['1b'], 0, 0);

        this.layer5 = this.dynamicMap.createBlankLayer('layer5', tiles, 0, 0, 18, 18);
        this.layer5.putTilesAt(this.levelData[this.levels[this.currentIndex]][5], 0, 0);

        this.layer6 = this.dynamicMap.createBlankLayer('layer6', tiles, 0, 0, 18, 18);
        this.layer6.putTilesAt(this.levelData[this.levels[this.currentIndex]][6], 0, 0);


        this.dynamicMap.setCollision([1],true,true,this.layer0);
        
        this.layer0.setCollisionByProperty({ collides: true })
        
        this.physics.world.setBounds(0, 0, this.layer0.width, this.layer0.height, true, true, true, true);
        this.cameras.main.setBounds(0, 0, this.layer0.width, this.layer0.height);
        
    }



    update() {

        //console.log("Camera : " + this.cameras.main._x + " , " + this.cameras.main._y);
        if (!this.cursors || this.ipc == null) {
            return;
        }

        if (this.checkInHole()) {
            return;
        }

        this.ipc.update();
        

        this.npc.forEach((npc) =>{
            npc.update();
        });


        if (!this.keyTab.isUp && !this.tabActive) 
        {
            this.tabActive = true;
            this.switchIPC();
           
        }
       
    }

    switchIPC()
    {
        var temp = this.ipc;
        this.ipc = this.npc[0];
        this.inputData['ipcSelected'] = this.ipc.getID();
        this.ipc.keyState = temp.keyState;

        this.npc.shift();
        temp.keyState = null;
        this.npc.push(temp);

        temp.isNPC = true;
        temp.npcStart = true;
        var interval = Math.random() * 10000//(5000 - 2000) + 2000;
        interval = (interval < 5000) ? 5000 : interval;
        setInterval(this.changeDirection, interval, temp);

        this.ipc.isNPC = false;

        this.cameras.main.startFollow(this.ipc, true, 0.1, 0.1);
       

        this.time.addEvent({ delay: 250, callback: this.ipcSwitchDelay, callbackScope: this, loop: false });
    }

    ipcSwitchDelay() {
        
        this.tabActive = false;
    }

    checkInHole()
    {
        if (!this.ipcInHole && this.checkOverlap(this.ipc, this.hole)) {
            this.ipcInHole = true;
            this.cameras.main.fadeOut(500);
            
            
            this.time.addEvent(
                {
                    delay: 500,
                    callback: this.updateLevel,
                    callbackScope: this,
                    loop: false
                });

            this.tweens.add({
                targets: this.ipc,
                ease: 'Linear',
                duration: 500,
                x: this.hole.x,
                y: this.hole.y
            });
            return true;
        }
        else
        {
            return false;
        }
    }


    npcCallBack() {
        this.time.addEvent({ delay: 250, callback: this.npcDelayDone, callbackScope: this, loop: false });
    }
    npcDelayDone() {
        this.npc.forEach(this.setNpcCollider.bind(this));
        this.npcLoaded = true;
    }

    setNpcCollider(npc) {
        npc.setCollideWorldBounds(true, 0, 0);
        npc.setSize(npc.width * 0.5, npc.height * 0.8, true);
        this.physics.add.collider(npc, this.layer0);
        npc.npcStart = true;
    }

    ipcAddedCallback() {

        this.time.addEvent({ delay: 250, callback: this.delayDone, callbackScope: this, loop: false });
        

    }
    delayDone() {


        this.ipc.setCollideWorldBounds(true, 0, 0);
        this.ipc.setSize(this.ipc.width * 0.5, this.ipc.height * 0.8, true);

        this.physics.add.collider(this.ipc, this.layer0);
       


        this.cameras.main.startFollow(this.ipc, true, 0.1, 0.1);
        this.cameras.main.fadeIn(250);

        //Fade In

       // this.ipc.body.onOverlap(true);
        //this.physics.overlapTiles(this.ipc, [2], this.coll());

       /* this.physics.add.overlap(this.ipc, this.layer,
            function onOverlap(sprite, tile) { console.log("overlap", tile.x, tile.y); },
            function process(sprite, tile) { return tile.collides; });*/

    }

    

    updateMusic() {

        if (this.currentIndex % 2 == 0) 
        {
            this.loop = this.sound.add('loop1');
        }
        else
        {
            this.loop = this.sound.add('loop2');
        }
        this.loop.setLoop(true);
        this.loop.setVolume(0.5);
        this.loop.play();
    }

  

    

    // resetSpaceBar(scene) {
    //     scene.genNPC = false;
    // }

    changeDirection(npc) {
        npc.ChangeDirection();
    }

    hitwall(sprite, tile)
    {
        if (sprite.isNPC == true && sprite.pNPC != null) {
            sprite.pNPC.ChangeDirection();
        }
           
        return false;
    }

    checkOverlap(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        var out;
        out = Phaser.Geom.Rectangle.Intersection(boundsA, boundsB, out);
        return out != null && out.width != 0 && out.height != 0;

    }

    coll() {
        this.time.addEvent(
            {
                delay: 500,
                callback: this.delayDone,
                callbackScope: this,
                loop: false
            });

    }

    debugCollider() {
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.layer0.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });


    }


    updateLevel() {

        this.currentIndex--;
        
        if (this.currentIndex < 0) {
            this.currentIndex = 19;
        }

        var data = {
            ownedIPCs : this.ownIPCs,
            levelData: this.levels,
            dungeonAddress : this.dungeonAddress,
            index: this.currentIndex,
            dungeonData: this.dungeonData,
            loadScene: 'dungeon',
            ipcSelected: this.inputData['ipcSelected']
        };

        this.loop.stop();
        //this.updateMusic();

        this.scene.start('loadingScene', data);

    }

    getCurrentLevel() {
        return this.currentIndex;
    }

    
}
