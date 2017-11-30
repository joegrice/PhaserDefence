class SmallGreenTower extends Tower {
    constructor(gameState, x, y) {
        super(gameState, x, y);
        this.key = "smallgreentower";
        this.loadTexture("smallgreentower");
        this.healthVal = GlobalState.SmallGreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallGreenTowerState.bulletSpeed;
    }
    addFireEvent() {
        this.fireTimer.loop(Phaser.Timer.SECOND * 3, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}
//# sourceMappingURL=SmallGreenTower.js.map