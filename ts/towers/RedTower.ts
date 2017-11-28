class RedTower extends Tower {

    constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
        super(game, x, y, bullets);
        this.key = "redtower";
        this.loadTexture("redtower");

        this.price = 20;
        this.healthVal = GlobalState.RedTowerState.healthVal;
        this.bulletSpeed = GlobalState.RedTowerState.bulletSpeed;
    }

    startFiring(): void {
        let fireEvent: Phaser.TimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}