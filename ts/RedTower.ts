module Models {
    export class RedTower extends Tower {
        
        bullets: Phaser.Group;
        firingTimer: number;

        constructor(game: Phaser.Game, x: number, y: number, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, x, y, sprite, towerGroup, bullets);

            this.firingTimer = 0;
            this.bullets = bullets;
        }

        fire() {
            if (this.game.time.now < this.firingTimer) { return; }

            let enemyBullet = this.bullets.getFirstExists(false);
            enemyBullet.reset(this.xPos, this.yPos)
            this.game.physics.arcade.moveToXY(enemyBullet, this.xPos + 10, this.yPos, 200);
            this.firingTimer = this.game.time.now + 2000;
        }
    }
}