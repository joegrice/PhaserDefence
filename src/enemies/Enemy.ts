import * as Phaser from "phaser-ce";
import Tower from "../towers/Tower";
import TowerBullet from "../bullets/TowerBullet";
import GameState from "../states/GameState";
import { IEnemyConfig } from "./IEnemyConfig";

export class Enemy extends Phaser.Sprite {

    gameState: GameState;
    dying: boolean;
    healthValue: number;
    emitter: Phaser.Particles.Arcade.Emitter;
    finalEnemy: boolean;
    eventTimer: Phaser.Timer;
    enemyConfig: IEnemyConfig;

    constructor(gameState: GameState, enemyConfig: IEnemyConfig) {
        super(gameState.game, 0, 0, enemyConfig.spriteKey);
        this.gameState = gameState;
        this.enemyConfig = enemyConfig;
        this.exists = false;
        this.dying = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.setSize(64, 64);
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.animations.add("walk");
        this.animations.play("walk", 20, true);
        this.healthValue = enemyConfig.healthValue;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = 0x337799;
        this.emitter = gameState.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles("apple_prop");

        this.addSpecialEffect();
    }

    addSpecialEffect(): void {
        if (this.enemyConfig.specialAbility !== undefined) {
            this.eventTimer = this.game.time.create(false);
            this.eventTimer.start();
            this.eventTimer.loop(this.enemyConfig.specialAbility.time, () => { this.enemyConfig.specialAbility.ability(this); }, this);
        }
    }

    spawn(x: number, y: number): void {
        this.reset(x, y);
        this.exists = true;
        this.body.velocity.x = this.enemyConfig.movementSpeed;
    }

    hitBullet(bullet: TowerBullet): void {
        if (this.dying) {
            return;
        }

        this.healthValue -= bullet.attackDamage;
        this.gameState.bullets.remove(bullet);

        if (this.healthValue < 1) {
            this.death();
        }
    }

    hitTower(tower: Tower): void {
        this.death();
    }

    death(): void {
        this.dying = true;
        this.body.velocity = 0;
        this.particleBurst();
        this.kill();
        if (this.eventTimer !== undefined) {
            this.eventTimer.removeAll();
        }
        this.gameState.addMoney(this.enemyConfig.moneyValue);
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