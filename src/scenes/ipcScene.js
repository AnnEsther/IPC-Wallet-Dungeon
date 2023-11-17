
class ipcScene extends Phaser.Scene {
    constructor() {
        super('ipcScene');
    }

    //DATA FROM FORM SCENE
    init(data) {
      this.inputData = data;
      this.ipcs = new Array();
      this.moveObjects = new Array();
    }

    preload() {
        
    }

    create() {

        this.clickSound = this.sound.add('click');

        this.centerX =  this.cameras.main.width / 2;
        this.centerY =  this.cameras.main.height / 2;

        this.currentIndex = 0;

        this.prevBtn = new BasicButton({
            'scene': this,
            'key': 'upBtn',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': 0,
            'y': 0
        });
        this.prevBtn.on('pointerdown', this.actionOnClick_prevBtn, this);
        this.prevBtn.setAngle(-90);
        this.prevBtn.setPosition(this.prevBtn.height*0.5, this.centerY);

        this.nextBtn = new BasicButton({
            'scene': this,
            'key': 'upBtn',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': 0,
            'y': 0
        });
        this.nextBtn.on('pointerdown', this.actionOnClick_nextBtn, this);
        this.nextBtn.setAngle(90);
        this.nextBtn.setPosition(this.cameras.main.width - this.nextBtn.height*0.5, this.centerY);

        this.startBtn = new BasicButton({
            'scene': this,
            'key': 'startBtn',
            'up': 0,
            'over': 1,
            'down': 2,
            'x': 0,
            'y': 0
        });
        this.startBtn.on('pointerdown', this.actionOnClick_startBtn, this);
        this.startBtn.setPosition(this.centerX, (this.cameras.main.height * 0.9) - (this.startBtn * 0.6));

        
        for(var i in this.inputData.ownedIPCs)
        {
            var ipc =this.inputData.ownedIPCs[i];

            var ipcSprite = new IPC(this,this.cameras.main.width * 0.25, this.centerY, ipc, function() {} );

            ipcSprite.visible = false;

            ipcSprite.setData('xPos', ipcSprite.x);
            this.ipcs.push(ipcSprite);
        }
       
        this.ipcs[0].visible = true;
      

        this.startBtn.setPosition(this.centerX, (this.cameras.main.height * 0.9) - (this.startBtn.height * 0.6));
            //this.ipcs[0].y + (this.ipcs[0].height * 0.5) + (this.startBtn.height * 0.5));
                // this.centerX, (this.cameras.main.height * 0.9) - (this.startBtn * 0.6));

        //var maxHeight = 

        var x = (this.cameras.main.width - (this.nextBtn.height * 2)) * 0.5 +   this.nextBtn.height; //this.ipcs[0].x + (this.ipcs[0].width * 0.6);
        var y = this.ipcs[0].y - (this.ipcs[0].height * 0.5);

        this.idText = this.add.text(x, y, 'ID           : ' + this.ipcs[0].getID(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.idText);
        y += this.idText.height * 1.1 * 2;


        this.raceText = this.add.text( x , y, 'RACE         : ' + this.ipcs[0].getRace(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.raceText);
        y += this.raceText.height * 1.1;

        this.subRaceText = this.add.text( x , y, 'SUB RACE     : ' + this.ipcs[0].getSubrace(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.subRaceText);
        y += this.subRaceText.height * 1.1;

        this.genderText = this.add.text( x , y, 'GENDER       : ' + this.ipcs[0].getGender(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.genderText);
        y += this.genderText.height * 1.1;

        this.skinColorText = this.add.text( x , y, 'SKIN COLOR   : ' + this.ipcs[0].getSkinColor(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.skinColorText);
        y += this.skinColorText.height * 1.1;

        this.hairColorText = this.add.text( x , y, 'HAIR COLOR   : ' + this.ipcs[0].getHairColor(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.hairColorText);
        y += this.hairColorText.height * 1.1;

        this.eyeColorText = this.add.text( x , y, 'EYE COLOR    : ' + this.ipcs[0].getEyeColor(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.eyeColorText);
        y += this.eyeColorText.height * 1.1;

        this.handednessText = this.add.text( x , y, 'HANDEDNESS   : ' + this.ipcs[0].getHandedness(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.handednessText);
        y += this.handednessText.height * 1.1 * 2;

        this.strengthText = this.add.text( x , y, 'STRENGTH     : ' + this.ipcs[0].getStrength(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.strengthText);
        y += this.strengthText.height * 1.1;

        this.dexterityText = this.add.text( x , y, 'DEXTERITY    : ' + this.ipcs[0].getDexterity(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.dexterityText);
        y += this.dexterityText.height * 1.1;

        this.intelligenceText = this.add.text( x , y, 'INTELLIGENCE : ' + this.ipcs[0].getIntelligence(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.intelligenceText);
        y += this.intelligenceText.height * 1.1;

        this.constitutionText = this.add.text( x , y, 'CONSTITUTION : ' + this.ipcs[0].getConstitution(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.constitutionText);
        y += this.constitutionText.height * 1.1;

        this.luckText = this.add.text( x , y, 'LUCK         : ' + this.ipcs[0].getLuck(),  { fontFamily: 'PressStart2P', } ).setOrigin(0, 0);
        this.moveObjects.push(this.luckText);
        y += this.luckText.height * 1.1;


        for(var i in this.moveObjects)
        {
            this.moveObjects[i].setData('xPos', this.moveObjects[i].x);
        }


        //this.moveObjects.push(this.ipcs[this.currentIndex]);

        this.prevBtn.visible = false;

        if(this.ipcs.length <= 1)
        {
            this.nextBtn.visible = false;
        }
       


    }

    actionOnClick_prevBtn()
    {
        this.clickSound.play();

        this.ipcs[this.currentIndex].visible = false;

        this.currentIndex--;
        if(this.currentIndex == 0)
        {
            this.prevBtn.visible = false;
        }
        if(this.currentIndex < this.ipcs.length-1)
        {
            this.nextBtn.visible = true;
        }

        this.ipcs[this.currentIndex].visible = true;
        this.setTexts();
    }

    actionOnClick_nextBtn()
    {
        this.clickSound.play();

        this.ipcs[this.currentIndex].visible = false;

        this.currentIndex++;
        if(this.currentIndex == this.ipcs.length-1)
        {
            this.nextBtn.visible = false;
        }
        if(this.currentIndex >= 1)
        {
            this.prevBtn.visible = true;
        }

        this.ipcs[this.currentIndex].visible = true;
        this.setTexts();
        
    }

    actionOnClick_startBtn()
    {
        this.clickSound.play();
        
        this.inputData['loadScene'] = 'dungeon';
        this.inputData['ipcSelected'] = this.ipcs[this.currentIndex].getID();
        this.scene.start('loadingScene', this.inputData);
    }

    setIPC(id)
    {

    }

    setTexts()
    {
        this.idText.setText('ID           : ' + this.ipcs[this.currentIndex].getID());
        this.raceText.setText('RACE         : ' + this.ipcs[this.currentIndex].getRace());
        this.subRaceText.setText('SUB RACE     : ' + this.ipcs[this.currentIndex].getSubrace());
        this.genderText.setText('GENDER       : ' + this.ipcs[this.currentIndex].getGender());
        this.skinColorText.setText('SKIN COLOR   : ' + this.ipcs[this.currentIndex].getSkinColor());
        this.hairColorText.setText('HAIR COLOR   : ' + this.ipcs[this.currentIndex].getHairColor());
        this.eyeColorText.setText('EYE COLOR    : ' + this.ipcs[this.currentIndex].getEyeColor());
        this.handednessText.setText('HANDEDNESS   : ' + this.ipcs[this.currentIndex].getHandedness());
        this.strengthText.setText('STRENGTH     : ' + this.ipcs[this.currentIndex].getStrength());
        this.dexterityText.setText('DEXTERITY    : ' + this.ipcs[this.currentIndex].getDexterity());
        this.intelligenceText.setText('INTELLIGENCE : ' + this.ipcs[this.currentIndex].getIntelligence());
        this.constitutionText.setText('CONSTITUTION : ' + this.ipcs[this.currentIndex].getConstitution());
        this.luckText.setText('LUCK         : ' + this.ipcs[this.currentIndex].getLuck());
    }

   

}
