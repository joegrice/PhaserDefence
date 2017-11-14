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
            this.sprite.body.velocity.x = 0;            
            this.firingTimer = 0;
            this.bullets = bullets;
        }

        fire() {
            let enemyBullet = this.bullets.getFirstExists(false);
            enemyBullet.reset(this.xPos, this.yPos);
            this.game.physics.arcade.moveToXY(enemyBullet, this.xPos + 10, this.yPos, 200);
        }
    }
}