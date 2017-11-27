class RedTower extends Tower {
    constructor(game, x, y, bullets) {
        super(game, x, y, bullets);
        this.key = "redtower";
        this.loadTexture("redtower");
        this.price = 20;
        this.healthVal = RedTowerStats.healthVal;
        this.bulletSpeed = RedTowerStats.bulletSpeed;
    }
    startFiring() {
        let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}
//# sourceMappingURL=RedTower.js.map