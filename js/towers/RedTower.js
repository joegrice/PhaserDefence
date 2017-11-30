class RedTower extends Tower {
    constructor(gameState, x, y) {
        super(gameState, x, y);
        this.key = "redtower";
        this.loadTexture("redtower");
        this.price = 20;
        this.healthVal = GlobalState.RedTowerState.healthVal;
        this.bulletSpeed = GlobalState.RedTowerState.bulletSpeed;
    }
    addFireEvent() {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}
//# sourceMappingURL=RedTower.js.map