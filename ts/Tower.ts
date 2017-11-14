module Models {
    export class Tower {
        game: Phaser.Game;
        sprite: Phaser.Sprite;
        xPos: number;
        yPos: number;
        bullets: Phaser.Group;
        firingTimer: number;

        constructor(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            this.game = game;
            this.sprite = sprite;
            this.xPos = sprite.x;
            this.yPos = sprite.y;
            towerGroup.add(this.sprite);
            
            this.firingTimer = 0;
            this.bullets = bullets;
        }

        fire() {   
        }

        update() {
            this.sprite.body.velocity.x = 0;
            this.fire();
        }
    }
}