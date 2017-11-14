module Models {
    export class SmallGreenTower extends Tower {
        
        constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
            super(game, x, y, bullets);
            this.key = "smallgreentower";
            this.loadTexture("smallgreentower");
        
            this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);            
        }
    }
}