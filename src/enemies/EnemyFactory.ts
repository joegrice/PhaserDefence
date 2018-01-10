import * as Phaser from "phaser-ce";
import { GameState } from "../states/GameState";
import { Enemy } from "../enemies/Enemy";
import { Configs } from "../configs/Configs";
import { IEnemyConfig } from "../enemies/IEnemyConfig";

export class EnemyFactory {

    gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    generateEnemies(maxEnemies: number): void {
        for (let y: number = 1; y < 7; y++) {
            // spawn all remaining enemies
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
            this.generateRandomEnemy(y, i);
        }
    }

    generateNumberOfEnemy(y: number, maxEnemies: number): void {
        for (let i: number = 0; i < maxEnemies; i++) {
            this.generateRandomEnemy(y, i);
        }
    }

    generateRandomEnemy(y: number, x: number): void {
        let chance: number = this.getRandomNumber(1, 6);
        // create random space between each enemy
        let xOffSet: number = this.getRandomNumber(170, 220);
        let xPixelPos: number = (14 * 64) + (xOffSet * x);
        let yPixelPos: number = y * 64;
        if (chance <= 3) {
            this.spawnEnemy(xPixelPos, yPixelPos, Configs.HeadDoctor);
        } else if (chance > 3 && chance < 5) {
            this.spawnEnemy(xPixelPos, yPixelPos, Configs.WomanDoctor);
        } else if (chance === 5) {
            this.spawnEnemy(xPixelPos, yPixelPos, Configs.AfroDoctor);
        } else if (chance === 6) {
            this.spawnEnemy(xPixelPos, yPixelPos, Configs.FlyingDoctor);
        }
    }

    generateRandomWeakEnemy(y: number, x: number): void {
        let chance: number = this.getRandomNumber(1, 5);
        if (chance <= 3) {
            this.spawnEnemy(x, y, Configs.HeadDoctor);
        } else if (chance > 3 && chance <= 5) {
            this.spawnEnemy(x, y, Configs.WomanDoctor);
        }
    }

    spawnEnemy(x: number, y: number, enemyConfig: IEnemyConfig): void {
        let enemy: Enemy = new Enemy(this.gameState, enemyConfig);
        this.gameState.enemies.add(enemy);
        enemy.spawn(x, y + enemy.body.height / 4);
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default EnemyFactory;