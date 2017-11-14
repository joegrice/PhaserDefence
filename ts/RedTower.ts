module Models {
    export class RedTower extends Tower {
        
        constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
            super(game, x, y, bullets);
            this.key = "redtower";
            this.loadTexture("redtower");

            this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);            
        }
    }
}