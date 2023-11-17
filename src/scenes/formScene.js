// import loadHTML from '../loadHTML.js'


const gameConfig = {
    contractAdress : "0x011c77fa577c500deedad364b8af9e8540b808c0",
    ethAddress : "https://eth-mainnet.g.alchemy.com/nft/v2/",
    ethKey : "rcOhiuoI-5K_NH_HRR31JUgmvdZCUcVg",
    currentAddress: "",
    addressEntries: {},
    Tile_Size: 250
  };

  const isValidJSON = obj => {
    try {
      JSON.parse(obj);
      return true;
    } catch (e) {
      return false;
    }
  };

class formScene extends Phaser.Scene {
    constructor() {
        super('form');
    }
    preload() {
        
    }
    create() {

        var background = new Phaser.Display.Color(121, 120, 120);
        this.cameras.main.setBackgroundColor(background);

        this.cameras.main.fadeIn(500, 0, 0, 0);
        //Position DOM to center
        var centerX = this.cameras.main.width / 2;
        var centerY = this.cameras.main.height / 2;
        this.searchElement = this.add.dom(centerX, centerY).createFromCache('inputform'); 
        //Add click functionality
        this.searchElement.addListener('click');
        //Add sound
        this.clickSound = this.sound.add('click');
        //Set callbacks with binding to current scene
        var validateInput = this.validateAddress.bind(this);
        var playClickSound = this.playBtnSound.bind(this);
        //Add On Click functionality from inputForm
        this.searchElement.on('click', 
        function (event) {
            playClickSound();
            //Reset shown response
            document.getElementById("response").innerHTML = "";
            //Get input address from inputForm
            gameConfig.currentAddress = this.getChildByName('Dungeon-id').value;
            //Call input validator
            validateInput(gameConfig.currentAddress);
        });

        
    }

    update() {

    }

    validateAddress(dungeonAddrss)
    {
        //Check if address string is in required format
        if (dungeonAddrss == '')
        {
            return;
        }
        if (20 != ((dungeonAddrss.length * 0.5) - 1)) 
        {
            gameConfig.addressEntries[gameConfig.currentAddress] = "Enter valid address";
            document.getElementById("response").innerHTML = gameConfig.addressEntries[gameConfig.currentAddress];
            document.getElementById("getAddress").reset();
            return;
        }
        //Check if address already has a response
        if(gameConfig.addressEntries.hasOwnProperty(dungeonAddrss))
        {
            document.getElementById("response").innerHTML = gameConfig.addressEntries[dungeonAddrss];
            document.getElementById("getAddress").reset();
            return;
        }
        //set current scene to GLOBAL variable
        gameConfig.scene = this.scene;
        //START REQUEST TO ETHERIUM WALLET
        const req = new XMLHttpRequest();
        req.addEventListener("load", this.reqListener);
        req.open("GET", 
        gameConfig.ethAddress + gameConfig.ethKey + "/getNFTs?owner=" + dungeonAddrss + "&contractAddresses[]=" +gameConfig.contractAdress);
        req.send();
        
    }

    reqListener() 
    {
        var result;
        var params;
        var ownedIPCs = [];
        //CHECK IF REPONSE IS JSON
        if(!isValidJSON(this.responseText))
        {
            // gameConfig.addressEntries[gameConfig.currentAddress] = this.responseText;
            // document.getElementById("response").innerHTML = this.responseText;
            // document.getElementById("getAddress").reset();
            // return;

            ownedIPCs.push(1);
            ownedIPCs.push(2);
            ownedIPCs.push(3);
        }
        else
        {
            // PARSE JSON
            result = JSON.parse(this.responseText);
            
            // GET ALL IPCs
            for(var i = 0; i < result['ownedNfts'].length; i++)
            {
                // CHECK IF SMART CONTRACT MATCHES
                //if(result['ownedNfts'][i]['contract']['address'].localeCompare(gameConfig.contractAdress) == 0)
                {
                    // PARSING IPC ID FROM HEX
                    ownedIPCs.push(parseInt(result['ownedNfts'][i]['id']['tokenId'], 16));
                }
            }
            // CHECK IF IPCs EXIST IN WALLET
            if(ownedIPCs.length == 0)
            {
                // gameConfig.addressEntries[gameConfig.currentAddress] = "Address contains 0 IPCs";
                // document.getElementById("response").innerHTML = gameConfig.addressEntries[gameConfig.currentAddress];
                // document.getElementById("getAddress").reset();
                // return;

                ownedIPCs.push(1);
                ownedIPCs.push(2);
                ownedIPCs.push(3);


            }

            
        }

        

        params = {
            dungeonAddress: gameConfig.currentAddress.toUpperCase(),
            levelData: gameConfig.currentAddress.toUpperCase().match(/.{1,2}/g),
            "ownedIPCs" : ownedIPCs,
            index: 0,
            "loadScene" : "ipcScene"
        };  

        //TO REMOVE 0x
        params.levelData.shift();

        gameConfig.scene.scene.cameras.main.fadeOut(500, 0, 0, 0);
        
        gameConfig.scene.start('loadingScene', params);
        

        //gameConfig.currentAddress = "";
      }


    playBtnSound()
    {
        this.clickSound.play();
    }

}

// export default formScene;

//0xF23dD87eD3591D43D3Bc7C2e181C2D0CE5473BC0
//0x0102030405060708091011121314151617181920