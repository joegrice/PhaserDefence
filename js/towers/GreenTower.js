class GreenTower extends Tower {
    constructor(game, x, y, bullets) {
        super(game, x, y, bullets);
        this.key = "greentower";
        this.loadTexture("greentower");
        this.healthVal = GlobalState.GreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.GreenTowerState.bulletSpeed;
    }
    startFiring() {
        let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}
//# sourceMappingURL=GreenTower.js.map