import * as Phaser from "phaser-ce";
import Enemy from "../enemies/Enemy";
import GameState from "../states/GameState";
import TowerBullet from "../bullets/TowerBullet";

export class Tower extends Phaser.Sprite {

    healthVal: number;
    bulletSpeed: number;
    price: number;
    gameState: GameState;
    fireTimer: Phaser.Timer;

    constructor(gameState: GameState, x: number, y: number) {
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
        this.fireTimer.removeAll();
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.smallBullets); }, this);
    }

    enemyOnRow(): boolean {
        let enemyOnRow: boolean = false;
        this.gameState.enemiesGroup.forEach((enemy: Enemy) => {
            let towerY: number = this.gameState.layer.getTileY(this.world.y);
            let enemyY: number = this.gameState.layer.getTileY(enemy.world.y);
            if (towerY === enemyY && enemy.x < this.game.width) {
                enemyOnRow = true;
                return enemyOnRow;
            }
        }, this);
        return enemyOnRow;
    }

    fire(bullets: Phaser.Group): void {
        if (this.enemyOnRow()) {
            let bullet: TowerBullet = bullets.getFirstExists(false);
            bullet.reset(this.x, this.y);
            this.game.physics.arcade.moveToXY(bullet, this.x + 10, this.y, this.bulletSpeed);
        }
    }
}

export default Tower;