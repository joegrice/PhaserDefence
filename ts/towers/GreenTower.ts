module Models {
    export class GreenTower extends Tower {

        constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
            super(game, x, y, bullets);
            this.key = "greentower";
            this.loadTexture("greentower");

            this.healthVal = Models.GreenTowerStats.healthVal;
            this.bulletSpeed = Models.GreenTowerStats.bulletSpeed;

            let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
            this.fireLoops.push(fireEvent);            
        }
    }
}