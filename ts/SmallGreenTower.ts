module Models {
    export class SmallGreenTower extends Tower {
        
        constructor(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, sprite, towerGroup, bullets);
        
            this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);            
        }
    }
}