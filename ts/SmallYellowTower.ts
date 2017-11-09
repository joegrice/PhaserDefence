module Models {
    export class SmallYellowTower extends Tower{
        bullets: Phaser.Group;
        firingTimer: number;
        firstFire: boolean;

        constructor(game: Phaser.Game, x: number, y: number, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, x, y, sprite, towerGroup, bullets);

            this.firstFire = false;
            this.firingTimer = 0;
            this.bullets = bullets;
        }

        fire() {
            if (this.game.time.now < this.firingTimer) { return; }

            if (!this.firstFire) {
                let enemyBullet = this.bullets.getFirstExists(false);
                enemyBullet.reset(this.xPos, this.yPos);
                this.game.physics.arcade.moveToXY(enemyBullet, this.xPos + 10, this.yPos, 200);
                this.firingTimer = this.game.time.now + 500;
                this.firstFire = true;
                return;
            }

            if (this.firstFire) {
                let enemyBullet2 = this.bullets.getFirstExists(false);
                enemyBullet2.reset(this.xPos, this.yPos);
                this.game.physics.arcade.moveToXY(enemyBullet2, this.xPos + 10, this.yPos, 200);
                this.firingTimer = this.game.time.now + 2500;
                this.firstFire = false;
                return;
            }
        }
    }
}