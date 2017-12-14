import * as Phaser from "phaser-ce";
import { GameState } from "../states/GameState";
import { Enemy } from "../enemies/Enemy";
import { Configs } from "../data/Configs";
import { IEnemyConfig } from "../enemies/IEnemyConfig";

export class EnemyFactory {

    gameState: GameState;
    enemiesGroup: Phaser.Group;

    constructor(gameState: GameState, enemiesGroup: Phaser.Group) {
        this.gameState = gameState;
        this.enemiesGroup = enemiesGroup;
    }

    generateEnemies(maxEnemies: number): void {
        for (let y: number = 1; y < 7; y++) {
            if (y === 7) {
                this.generateNumberOfEnemy(y, maxEnemies);
            }
            this.generateRandomNumberOfEnemy(y, maxEnemies);
        }
    }

    generateRandomNumberOfEnemy(y: number, maxEnemies: number): void {
        let random: number = this.getRandomNumber(3, 5);
        maxEnemies -= random;
        for (let i: number = 0; i < random; i++) {
            this.generateEnemy(y, i);
        }
    }

    generateNumberOfEnemy(y: number, maxEnemies: number): void {
        for (let i: number = 0; i < maxEnemies; i++) {
            this.generateEnemy(y, i);
        }
    }

    generateEnemy(y: number, rowPosition: number): void {
        let chance: number = this.getRandomNumber(1, 6);
        let xOffSet: number = this.getRandomNumber(150, 200);
        let xPixelPos: number = (14 * 64) + (xOffSet * rowPosition);
        let yPixelPos: number = y * 64;
        if (chance <= 3) {
            this.addEnemyToGroup(xPixelPos, yPixelPos, Configs.HeadDoctor);
        } else if (chance > 3 && chance < 5) {
            this.addEnemyToGroup(xPixelPos, yPixelPos, Configs.WomanDoctor);
        } else if (chance === 5) {
            this.addEnemyToGroup(xPixelPos, yPixelPos, Configs.AfroDoctor);
        } else if (chance === 6) {
            this.addEnemyToGroup(xPixelPos, yPixelPos, Configs.FlyingDoctor);
        }
    }

    addEnemyToGroup(x: number, y: number, enemyConfig: IEnemyConfig): void {
        let enemy: Enemy = new Enemy(this.gameState, enemyConfig);
        this.enemiesGroup.add(enemy);
        enemy.spawn(x, y + enemy.body.height / 4);
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default EnemyFactory;