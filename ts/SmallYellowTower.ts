module Models {
    export class SmallYellowTower extends Tower{
        
        firstFire: boolean;

        constructor(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, sprite, towerGroup, bullets);

            this.firstFire = false;
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