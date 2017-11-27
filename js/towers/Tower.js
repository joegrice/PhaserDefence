class Tower extends Phaser.Sprite {
    constructor(game, x, y, bullets) {
        super(game, x, y);
        this.game.physics.enable(this);
        this.body.velocity.x = 0;
        this.inputEnabled = true;
        this.input.enableSnap(64, 64, false, true);
        this.input.enableDrag(true, true);
        this.bullets = bullets;
        this.healthVal = 10;
        this.price = 15;
        this.fireLoops = [];
    }
    place(x, y) {
        this.input.draggable = false;
        this.reset(x, y);
    }
    hitEnemy(enemy) {
        this.healthVal -= enemy.attackDamage;
        if (this.healthVal < 1) {
            this.die();
        }
    }
    die() {
        // this.animations.play("enemy1death", 22, true);
        this.kill();
        this.parent.removeChild(this);
        this.clearFireEvents();
    }
    clearFireEvents() {
        this.fireLoops.forEach(loop => {
            this.game.time.events.remove(loop);
        });
    }
    startFiring() {
        let fireEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }
    fire() {
        let bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.x, this.y);
        this.game.physics.arcade.moveToXY(bullet, this.x + 10, this.y, this.bulletSpeed);
    }
}
//# sourceMappingURL=Tower.js.map