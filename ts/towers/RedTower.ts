class RedTower extends Tower {

    constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
        super(game, x, y, bullets);
        this.key = "redtower";
        this.loadTexture("redtower");

        this.healthVal = RedTowerStats.healthVal;
        this.bulletSpeed = RedTowerStats.bulletSpeed;

        let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
}