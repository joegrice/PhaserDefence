module Models {
    export class Tower extends Phaser.Sprite {
        
        bullets: Phaser.Group;
        healthVal: number;
        fireLoops: Phaser.TimerEvent[];
        bulletSpeed: number;

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
                this.die();
            }
        }

        die() {
            //this.animations.play("enemy1death", 22, true);            
            this.kill();
            this.parent.removeChild(this);
            this.clearFireEvents();
        }

        clearFireEvents() {
            this.fireLoops.forEach(loop => {
                this.game.time.events.remove(loop);
            });
        }

        fire() {
            let bullet = this.bullets.getFirstExists(false);
            bullet.reset(this.x, this.y);
            this.game.physics.arcade.moveToXY(bullet, this.x + 10, this.y, this.bulletSpeed);
        }
    }
}