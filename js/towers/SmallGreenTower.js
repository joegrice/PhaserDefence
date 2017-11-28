class SmallGreenTower extends Tower {
    constructor(game, x, y, bullets) {
        super(game, x, y, bullets);
        this.key = "smallgreentower";
        this.loadTexture("smallgreentower");
        this.healthVal = GlobalState.SmallGreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallGreenTowerState.bulletSpeed;
    }
    startFiring() {
        let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}
//# sourceMappingURL=SmallGreenTower.js.map