class GreenTower extends Tower {

    constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
        super(game, x, y, bullets);
        this.key = "greentower";
        this.loadTexture("greentower");

        this.healthVal = GlobalState.GreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.GreenTowerState.bulletSpeed;
    }

    startFiring(): void {
        let fireEvent: Phaser.TimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}