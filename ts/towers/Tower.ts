module Models {
    export class Tower extends Phaser.Sprite {

        bullets: Phaser.Group;
        healthVal: number;
        fireLoops: Phaser.TimerEvent[];

        constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
            super(game, 0, 0);
            this.exists = false;
            this.game.physics.enable(this);            
            this.body.velocity.x = 0;            
            this.bullets = bullets;
            this.healthVal = 10;
            this.fireLoops = [];            
            this.reset(x, y);
        }

        hitEnemy(enemy: Enemy.Enemy) {
            this.healthVal -= enemy.attackDamage;          

            if (this.healthVal < 1) {
                //this.animations.play("enemy1death", 22, true);
                this.kill();
                this.parent.removeChild(this);
                this.fireLoops.forEach(loop => {
                    this.game.time.events.remove(loop);
                });
            }
        }

        fire() {
            let enemyBullet = this.bullets.getFirstExists(false);
            enemyBullet.reset(this.x, this.y);
            this.game.physics.arcade.moveToXY(enemyBullet, this.x + 10, this.y, 200);
        }
    }
}