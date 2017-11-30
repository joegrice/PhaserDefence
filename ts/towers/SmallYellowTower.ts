class SmallYellowTower extends Tower {

    constructor(gameState: GameState, x: number, y: number) {
        super(gameState, x, y);
        this.key = "smallyellowtower";
        this.loadTexture("smallyellowtower");

        this.price = 20;
        this.healthVal = GlobalState.SmallYellowTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallYellowTowerState.bulletSpeed;
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 3, () => { this.fire(this.gameState.smallBullets); }, this);
        this.fireTimer.loop(Phaser.Timer.SECOND * 3.5, () => { this.fire(this.gameState.smallBullets); }, this);
    }
}