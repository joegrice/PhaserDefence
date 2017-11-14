module Models {
    export class RedTower extends Tower {
        
        constructor(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, sprite, towerGroup, bullets);
        }

        fire() {
            if (this.game.time.now < this.firingTimer) { return; }

            let enemyBullet = this.bullets.getFirstExists(false);
            enemyBullet.reset(this.xPos, this.yPos);
            this.game.physics.arcade.moveToXY(enemyBullet, this.xPos + 10, this.yPos, 200);
            this.firingTimer = this.game.time.now + 2000;
        }
    }
}