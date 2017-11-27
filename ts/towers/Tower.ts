class Tower extends Phaser.Sprite {

    bullets: Phaser.Group;
    healthVal: number;
    fireLoops: Phaser.TimerEvent[];
    bulletSpeed: number;
    price: number;

    constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
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

    place(x: number, y: number): void {
        this.input.draggable = false;
        this.reset(x, y);
    }

    hitEnemy(enemy: Enemy): void {
        this.healthVal -= enemy.attackDamage;
        if (this.healthVal < 1) {
            this.die();
        }
    }

    die(): void {
        // this.animations.play("enemy1death", 22, true);
        this.kill();
        this.parent.removeChild(this);
        this.clearFireEvents();
    }

    clearFireEvents(): void {
        this.fireLoops.forEach(loop => {
            this.game.time.events.remove(loop);
        });
    }

    startFiring(): void {
        let fireEvent: Phaser.TimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.fire, this);
        this.fireLoops.push(fireEvent);
    }

    fire(): void {
        let bullet: TowerBullet = this.bullets.getFirstExists(false);
        bullet.reset(this.x, this.y);
        this.game.physics.arcade.moveToXY(bullet, this.x + 10, this.y, this.bulletSpeed);
    }
}