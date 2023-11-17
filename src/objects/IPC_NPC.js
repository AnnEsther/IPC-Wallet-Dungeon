
class IPC_NPC extends Phaser.GameObjects.GameObject {
    #ipcID;
    #attribute;

    constructor(scene, x, y, id, _callback) {

        super(scene, "NPC");
        this.id = Math.floor(Math.random() * 2380);
        this.ipc = new IPC(scene, x, y, this.id, _callback);
        this.ipc.isNPC = true;
        this.ipc.pNPC = this;
        this.ipc.setScale(0.5);
        this.speed = 400;
        this.deltaX = 400;
        this.deltaY = 400;
        this.dir = 0;
        this.ChangeDirection();
        this.start = false;
    }

    Update() {
        if (this.start) {
            this.ipc.setVelocity(this.deltaX, this.deltaY);
        }
    }

    ChangeDirection() {
        var direction = Math.floor(Math.random() * 4);
        while (this.dir == direction) {
            direction = Math.floor(Math.random() * 4);
        }
        if (direction == 0) { //NORTH
            this.deltaX = 0;
            this.deltaY = this.speed;
        }
        else if (direction == 1) { //south
            
            this.deltaX = 0;
            this.deltaY = -this.speed;
        }
        else if (direction == 2) { //east
            this.ipc.setFlipX(false);
            this.deltaX = this.speed;
            this.deltaY = 0;
        }
        else if (direction == 3) {
            this.ipc.setFlipX(true);
            this.deltaX = -this.speed;
            this.deltaY = 0;
        }
        this.dir = direction;
    }
   
}
