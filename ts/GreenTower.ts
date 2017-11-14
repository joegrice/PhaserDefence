module Models {
    export class GreenTower extends Tower {

        constructor(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, sprite, towerGroup, bullets);

            this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        }
    }
}