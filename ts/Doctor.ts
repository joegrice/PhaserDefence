module Enemy {
    export class Doctor extends Enemy {
        constructor(game) {
            super(game);
            this.key = "enemy1";
            this.loadTexture("enemy1");
            this.animations.add('walk');
            this.animations.play('walk', 15, true);
            //let deathAnim = this.animations.add('enemy1death');
            //deathAnim.onComplete.add(this.death, this);
            /*this.animations.add('walk', Phaser.Animation.generateFrameNames('enemy01_walk_', 1, 15, '.png'), 20, true);
            this.animations.play('walk', 15, true);
            let deathAnim = this.animations.add('death', Phaser.Animation.generateFrameNames('enemy01_death_', 1, 22, '.png'), 20, true);
            deathAnim.onComplete.add(this.death, this);*/   
        }

        spawn(x, y) {
            this.stdReset(x, y);
            this.body.velocity.x = -10;
        }

        hit(bullet: Phaser.Bullet) {
            if (this.dying) {
                return;
            }

            bullet.kill();
            this.healthVal -= 10;          

            if (this.healthVal < 1) {
                this.dying = true;
                this.body.velocity = 0;
                //this.animations.play("enemy1death", 22, true);
                this.death();
            }

        }
    }
}