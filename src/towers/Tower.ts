import * as Phaser from "phaser-ce";
import Enemy from "../enemies/Enemy";
import GameState from "../states/GameState";
import TowerBullet from "../bullets/TowerBullet";
import { ITowerConfig } from "./ITowerConfig";
import { ITowerBulletConfig } from "../bullets/ITowerBulletConfig";
import { Configs } from "../data/Configs";

export class Tower extends Phaser.Sprite {

    healthVal: number;
    gameState: GameState;
    fireTimer: Phaser.Timer;
    towerConfig: ITowerConfig;
    fireSound: Phaser.Sound;
    deathSound: Phaser.Sound;

    constructor(gameState: GameState, x: number, y: number, towerConfig: ITowerConfig) {
        super(gameState.game, x, y, towerConfig.spriteKey);
        this.gameState = gameState;
        this.towerConfig = towerConfig;
        this.game.physics.enable(this);
        this.body.velocity.x = 0;
        this.inputEnabled = true;
        this.input.enableSnap(64, 64, false, true);
        this.input.enableDrag(true, true);
        this.healthVal = towerConfig.healthVal;
        this.fireTimer = this.game.time.create(false);
        this.fireSound = this.game.add.audio(towerConfig.bulletConfig.fireSoundKey);
        this.deathSound = this.game.add.audio(towerConfig.deathSoundKey);
        this.fireTimer.start();
    }

    place(x: number, y: number): void {
        this.input.draggable = false;
        this.reset(x, y);
        this.gameState.subtractMoney(this.towerConfig.price);
        this.addFireEvent();
        this.gameState.towers.add(this);
    }

    hitEnemy(enemy: Enemy): void {
        this.healthVal -= enemy.enemyConfig.attackDamage;
        if (this.healthVal < 1) {
            this.die();
        }
    }

    die(): void {
        this.deathSound.play();
        this.kill();
        this.parent.removeChild(this);
        this.clearFireEvents();
    }

    clearFireEvents(): void {
        this.fireTimer.removeAll();
    }

    addFireEvent(): void {
        this.towerConfig.fireTimes.forEach((fireTime: number) => {
            this.fireTimer.loop(fireTime, () => { this.fire(); }, this);
        });
    }

    enemyOnRow(): boolean {
        let enemyOnRow: boolean = false;
        this.gameState.enemies.forEach((enemy: Enemy) => {
            let towerY: number = this.gameState.layer.getTileY(this.world.y);
            let enemyY: number = this.gameState.layer.getTileY(enemy.world.y);
            if (towerY === enemyY && enemy.x < this.game.width) {
                enemyOnRow = true;
                return enemyOnRow;
            }
        }, this);
        return enemyOnRow;
    }

    fire(): void {
        if (this.enemyOnRow()) {
            let towerBullet: TowerBullet;
            for (let i: number = 0; i < this.gameState.bullets.children.length; i++) {
                let foundBullet: TowerBullet = <TowerBullet>this.gameState.bullets.getAt(i);
                if (foundBullet.key === this.towerConfig.bulletConfig.spriteKey && foundBullet.exists === false) {
                    towerBullet = foundBullet;
                    break;
                }
            }
            towerBullet.reset(this.x, this.y);
            this.game.physics.arcade.moveToXY(towerBullet, this.gameState.game.width, this.y, this.towerConfig.bulletSpeed);
            this.fireSound.play();
        }
    }
}

export default Tower;