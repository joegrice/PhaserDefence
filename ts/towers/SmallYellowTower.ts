class SmallYellowTower extends Tower {

    constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
        super(game, x, y, bullets);
        this.key = "smallyellowtower";
        this.loadTexture("smallyellowtower");

        this.price = 20;
        this.healthVal = SmallYellowTowerStats.healthVal;
        this.bulletSpeed = SmallYellowTowerStats.bulletSpeed;
    }

    startFiring(): void {
        let fireEvent1: Phaser.TimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);
        this.fireLoops.push(fireEvent1);
        let fireEvent2: Phaser.TimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 3.5, this.fire, this);
        this.fireLoops.push(fireEvent2);
    }
}