import * as Phaser from "phaser-ce";
import Tower from "../towers/Tower";
import TowerBullet from "../bullets/TowerBullet";
import GameState from "../states/GameState";

export class Enemy extends Phaser.Sprite {

    gameState: GameState;
    dying: boolean;
    moneyValue: number;
    scoreValue: number;
    healthValue: number;
    attackDamage: number;
    emitter: Phaser.Particles.Arcade.Emitter;
    finalEnemy: boolean;
    movementSpeed: number;

    constructor(gameState: GameState) {
        super(gameState.game, 0, 0);
        this.gameState = gameState;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.setSize(64, 64);
        this.dying = false;
        this.healthValue = 10;
        this.moneyValue = 2;
        this.scoreValue = 5;
        this.attackDamage = 5;
        this.movementSpeed = -25;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = 0x337799;
        this.emitter = gameState.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles("apple_prop");
    }

    spawn(x: number, y: number): void {
        this.reset(x, y);
        this.dying = false;
        this.body.velocity.x = this.movementSpeed;
    }

    hitBullet(bullet: TowerBullet): void {
        if (this.dying) {
            return;
        }

        bullet.kill();
        this.healthValue -= bullet.attackDamage;

        if (this.healthValue < 1) {
            this.dying = true;
            this.body.velocity = 0;
            this.death();
        }
    }

    hitTower(tower: Tower): void {
        this.death();
    }

    death(): void {
        this.particleBurst();
        this.kill();
        if (this.parent.children.length === 1) {
            this.parent.removeChild(this);
            this.game.state.start("ShopState", true, false);
            return;
        }
        this.parent.removeChild(this);
    }

    particleBurst(): void {
        this.emitter.x = this.x;
        this.emitter.y = this.y;
        this.emitter.start(true, 1000, null, 5);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyEmitter, this);
    }

    destroyEmitter(): void {
        this.emitter.destroy();
    }
}

export default Enemy;