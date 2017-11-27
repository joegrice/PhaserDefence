class Enemy extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0);
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.setSize(64, 64);
        this.dying = false;
        this.healthVal = 10;
        this.moneyValue = 2;
        this.attackDamage = 5;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = 0x337799;
        this.emitter = game.add.emitter(0, 0, 100);
        this.emitter.makeParticles("apple_prop");
    }
    stdReset(x, y) {
        this.reset(x, y);
        this.dying = false;
    }
    hitBullet(bullet) {
        if (this.dying) {
            return;
        }
        bullet.kill();
        this.healthVal -= bullet.attackDamage;
        if (this.healthVal < 1) {
            this.dying = true;
            this.body.velocity = 0;
            this.death();
        }
    }
    hitTower(tower) {
        this.death();
    }
    death() {
        this.particleBurst();
        this.kill();
        this.parent.removeChild(this);
    }
    particleBurst() {
        this.emitter.x = this.x;
        this.emitter.y = this.y;
        this.emitter.start(true, 1000, null, 5);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyEmitter, this);
    }
    destroyEmitter() {
        this.emitter.destroy();
    }
}
//# sourceMappingURL=Enemy.js.map