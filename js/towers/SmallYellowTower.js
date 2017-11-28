class SmallYellowTower extends Tower {
    constructor(game, x, y, bullets) {
        super(game, x, y, bullets);
        this.key = "smallyellowtower";
        this.loadTexture("smallyellowtower");
        this.price = 20;
        this.healthVal = GlobalState.SmallYellowTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallYellowTowerState.bulletSpeed;
    }
    startFiring() {
        let fireEvent1 = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);
        this.fireLoops.push(fireEvent1);
        let fireEvent2 = this.game.time.events.loop(Phaser.Timer.SECOND * 3.5, this.fire, this);
        this.fireLoops.push(fireEvent2);
    }
}
//# sourceMappingURL=SmallYellowTower.js.map