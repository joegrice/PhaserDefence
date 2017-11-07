module Models {
    export class Tower {
        xPos: number;
        yPos: number;
        game: Phaser.Game;
        sprite: Phaser.Sprite;
        weapon: Phaser.Weapon;

        constructor(game: Phaser.Game, x: number, y: number, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            this.game = game;
            this.xPos = x;
            this.yPos = y;
            this.sprite = sprite;
            towerGroup.add(this.sprite);
        }

        fire() {
            
        }
    }
}