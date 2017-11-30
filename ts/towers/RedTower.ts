class RedTower extends Tower {

    constructor(gameState: GameState, x: number, y: number) {
        super(gameState, x, y);
        this.key = "redtower";
        this.loadTexture("redtower");

        this.price = 20;
        this.healthVal = GlobalState.RedTowerState.healthVal;
        this.bulletSpeed = GlobalState.RedTowerState.bulletSpeed;
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}