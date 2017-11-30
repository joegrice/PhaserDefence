class GreenTower extends Tower {
    constructor(gameState, x, y) {
        super(gameState, x, y);
        this.key = "greentower";
        this.loadTexture("greentower");
        this.healthVal = GlobalState.GreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.GreenTowerState.bulletSpeed;
    }
    addFireEvent() {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}
//# sourceMappingURL=GreenTower.js.map