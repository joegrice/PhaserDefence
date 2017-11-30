class Tower extends Phaser.Sprite {
    constructor(gameState, x, y) {
        super(gameState.game, x, y);
        this.game.physics.enable(this);
        this.gameState = gameState;
        this.body.velocity.x = 0;
        this.inputEnabled = true;
        this.input.enableSnap(64, 64, false, true);
        this.input.enableDrag(true, true);
        this.healthVal = 10;
        this.price = 15;
        this.fireTimer = this.game.time.create(false);
        this.fireTimer.start();
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
        this.fireTimer.removeAll();
    }
    addFireEvent() {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.smallBullets); }, this);
    }
    enemyOnRow() {
        let enemyOnRow = false;
        this.gameState.enemiesGroup.forEach((enemy) => {
            let towerY = this.gameState.layer.getTileY(this.world.y);
            let enemyY = this.gameState.layer.getTileY(enemy.world.y);
            if (towerY === enemyY && enemy.x < this.game.width) {
                enemyOnRow = true;
                return enemyOnRow;
            }
        }, this);
        return enemyOnRow;
    }
    fire(bullets) {
        if (this.enemyOnRow()) {
            let bullet = bullets.getFirstExists(false);
            bullet.reset(this.x, this.y);
            this.game.physics.arcade.moveToXY(bullet, this.x + 10, this.y, this.bulletSpeed);
        }
    }
}
//# sourceMappingURL=Tower.js.map