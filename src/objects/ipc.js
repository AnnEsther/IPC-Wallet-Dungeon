
class IPC extends Phaser.Physics.Arcade.Sprite {
    #ipcID;
    #attribute;
    isNPC;
    pNPC;

    constructor(scene, x, y, id, _callback, _keyState) {
        super(scene, x, y, id);
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.setScale(1);

        this.#ipcID = id;
        this.#attribute = {
            Strength: 0,
            StrengthAttributes: {
                Force: 0,
                Sustain: 0,
                Tolerance: 0
            },
            Dexterity: 0,
            DexterityAttributes: {
                Speed: 0,
                Precision: 0,
                Reaction: 0
            },
            Intelligence: 0,
            IntelligenceAttributes: {
                Memory: 0,
                Processing: 0,
                Reasoning: 0
            },
            Constitution: 0,
            ConstitutionAttributes: {
                Healing: 0,
                Fortitude: 0,
                Vitality: 0
            },
            Luck: 0,
            DNA: {
                Race: '',
                Subrace: '',
                Gender: '',
                SkinColor: '',
                HairColor: '',
                EyeColor: '',
                Handedness: ''
            },

        };
        this._callback = _callback;

        this.dir = 0;

        if(_keyState == null)
        {
            this.isNPC = true;
            this.pNPC = this;
            this.ChangeDirection();
        }
        else
        {
            this.keyState = _keyState;
            this.isNPC = false;
            this.pNPC = null;
        }
       
        this.ipcSpeed = 400;
        
        this.npcStart = false;

        this.deltaX = 0;
        this.deltaY = 0;

        
        this.getIpcRequest(this, scene);
    }

    
    ChangeDirection() {
        var direction = Math.floor(Math.random() * 4);
        while (this.dir == direction) 
        {
            direction = Math.floor(Math.random() * 4);
        }
        if (direction == 0) { //NORTH
            this.deltaX = 0;
            this.deltaY = this.ipcSpeed;
        }
        else if (direction == 1) { //south
            
            this.deltaX = 0;
            this.deltaY = -this.ipcSpeed;
        }
        else if (direction == 2) { //east
            this.setFlipX(false);
            this.deltaX = this.ipcSpeed;
            this.deltaY = 0;
        }
        else if (direction == 3) {
            this.setFlipX(true);
            this.deltaX = -this.ipcSpeed;
            this.deltaY = 0;
        }
        this.dir = direction;

        // this.#setAttributes
    }

    getID() { return this.#ipcID };

    getStrength() { return this.#attribute.Strength; };
    getForce() { return this.#attribute.StrengthAttributes.Force; };
    getSustain() { return this.#attribute.StrengthAttributes.Sustain; };
    getTolerance() { return this.#attribute.StrengthAttributes.Tolerance; };

    getDexterity() { return this.#attribute.Dexterity; };
    getSpeed() { return this.#attribute.DexterityAttributes.Speed; };
    getPrecision() { return this.#attribute.DexterityAttributes.Precision; };
    getReaction() { return this.#attribute.DexterityAttributes.Reaction; };

    getIntelligence() { return this.#attribute.Intelligence; };
    getMemory() { return this.#attribute.IntelligenceAttributes.Memory; };
    getProcessing() { return this.#attribute.IntelligenceAttributes.Processing; };
    getReasoning() { return this.#attribute.IntelligenceAttributes.Reasoning; };

    getConstitution() { return this.#attribute.Constitution; };
    getHealing() { return this.#attribute.ConstitutionAttributes.Healing; };
    getFortitude() { return this.#attribute.ConstitutionAttributes.Fortitude; };
    getVitality() { return this.#attribute.ConstitutionAttributes.Vitality; };

    getLuck() { return this.#attribute.Luck; };

    getRace() { return this.#attribute.DNA.Race; };
    getSubrace() { return this.#attribute.DNA.Subrace; };
    getGender() { return this.#attribute.DNA.Gender; };
    getSkinColor() { return this.#attribute.DNA.SkinColor; };
    getHairColor() { return this.#attribute.DNA.HairColor; };
    getEyeColor() { return this.#attribute.DNA.EyeColor; };
    getHandedness() { return this.#attribute.DNA.Handedness; };

    getIpcRequest(ipc, scene) {
        try {
            //New implementation
            //scene.load.spritesheet(ipc.getID(), 'assets/IPC Sprite Sheets/' + ipc.getID() + '.png', { frameWidth: 320, frameHeight: 320 });
            var thisIPCJson = scene.cache.json.get('dataBase');
           // var nameIPC = new IPCName(scene, thisIPCJson[this.ipcId].name, ipc);

            this.#setAttributes(thisIPCJson[ipc.getID()]);
            //IPC Attributes
            ipc.name = thisIPCJson[ipc.getID()].name
            ipc.race = thisIPCJson[ipc.getID()].attributes[0].value
            ipc.subrace = thisIPCJson[ipc.getID()].attributes[1].value
            ipc.gender = thisIPCJson[ipc.getID()].attributes[2].value
            ipc.height = thisIPCJson[ipc.getID()].attributes[3].value
            ipc.handedness = thisIPCJson[ipc.getID()].attributes[7].value
            ipc.strength = thisIPCJson[ipc.getID()].attributes[10].value
            ipc.force = thisIPCJson[ipc.getID()].attributes[11].value
            ipc.sustain = thisIPCJson[ipc.getID()].attributes[12].value
            ipc.tolerance = thisIPCJson[ipc.getID()].attributes[13].value
            ipc.dexterity = thisIPCJson[ipc.getID()].attributes[14].value
            ipc.speed = thisIPCJson[ipc.getID()].attributes[15].value
            ipc.precision = thisIPCJson[ipc.getID()].attributes[16].value
            ipc.reaction = thisIPCJson[ipc.getID()].attributes[17].value
            ipc.intelligence = thisIPCJson[ipc.getID()].attributes[18].value
            ipc.memory = thisIPCJson[ipc.getID()].attributes[19].value
            ipc.processing = thisIPCJson[ipc.getID()].attributes[20].value
            ipc.reasoning = thisIPCJson[ipc.getID()].attributes[21].value
            ipc.constitution = thisIPCJson[ipc.getID()].attributes[22].value
            ipc.healing = thisIPCJson[ipc.getID()].attributes[23].value
            ipc.fortitude = thisIPCJson[ipc.getID()].attributes[24].value
            ipc.vitality = thisIPCJson[ipc.getID()].attributes[25].value
            ipc.luck = thisIPCJson[ipc.getID()].attributes[26].value
           // ipc.maxVelocity = ipc.calculateMaxVelocity();

            if (ipc.getHandedness() == "Left") {
                ipc.setFlipX(true)
            }
            else {
                ipc.setFlipX(false)
            }

            scene.load.once('complete', () => [
                //console.log("scene load complete inside IPC.js"),
                ipc._callback(ipc),

                ipc.setTexture(ipc.ipcId, 0),
                scene.anims.create({
                    key: ipc.getID() + 'running',
                    frameRate: 10,
                    frames: scene.anims.generateFrameNumbers(ipc.getID(), { starts: 7, ends: 0 }),
                    repeat: -1
                }),
                ipc.playReverse(ipc.getID() + 'running'),
                this.spawned = true
            ]);

            scene.load.start();
        }
        catch (err) {
            console.log(err);
            ipc.destroy();
        }
        
    
    }
    update(){

        if(this.isNPC)
        {
            if (this.npcStart) 
            {
                this.setVelocity(this.deltaX, this.deltaY);
            }
            return;
        }
        
        if (!this.keyState.left.isUp) {
            this.setFlipX(true);
            this.setVelocity(-this.ipcSpeed, 0);

        }
        else if (!this.keyState.right.isUp) {
            this.setFlipX(false);
            this.setVelocity(this.ipcSpeed, 0);
        } 
        else if (!this.keyState.up.isUp) {

            this.setVelocity(0, -this.ipcSpeed);

        }
        else if (!this.keyState.down.isUp) {

            this.setVelocity(0, this.ipcSpeed);

        }
        else {
            this.setVelocity(0, 0);
        }
    }

    moveTo(x, y)
    {

    }

    #setAttributes(jsonObj) {
        var tmp = [];

        for (var i in jsonObj.attributes) {
            tmp[jsonObj.attributes[i].trait_type] = jsonObj.attributes[i].value;
        }

        this.#attribute.Strength = tmp['Strength'];
        this.#attribute.StrengthAttributes.Force = tmp['Force'];
        this.#attribute.StrengthAttributes.Sustain = tmp['Sustain'];
        this.#attribute.StrengthAttributes.Tolerance = tmp['Tolerance'];

        this.#attribute.Dexterity = tmp['Dexterity'];
        this.#attribute.DexterityAttributes.Speed = tmp['Speed'];
        this.#attribute.DexterityAttributes.Precision = tmp['Precision'];
        this.#attribute.DexterityAttributes.Reaction = tmp['Reaction'];

        this.#attribute.Intelligence = tmp['Intelligence'];
        this.#attribute.IntelligenceAttributes.Memory = tmp['Memory'];
        this.#attribute.IntelligenceAttributes.Processing = tmp['Processing'];
        this.#attribute.IntelligenceAttributes.Reasoning = tmp['Reasoning'];

        this.#attribute.Constitution = tmp['Constitution'];
        this.#attribute.ConstitutionAttributes.Healing = tmp['Healing'];
        this.#attribute.ConstitutionAttributes.Fortitude = tmp['Fortitude'];
        this.#attribute.ConstitutionAttributes.Vitality = tmp['Vitality'];

        this.#attribute.DNA.Race = tmp['Race'];
        this.#attribute.DNA.Subrace = tmp['Subrace'];
        this.#attribute.DNA.Gender = tmp['Gender'];
        this.#attribute.DNA.SkinColor = tmp['Skin Color'];
        this.#attribute.DNA.HairColor = tmp['Hair Color'];
        this.#attribute.DNA.EyeColor = tmp['Eye Color'];
        this.#attribute.DNA.Handedness = tmp['Handedness'];

        this.#attribute.Luck = tmp['Luck'];
    }
}
