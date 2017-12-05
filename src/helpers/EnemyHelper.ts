import * as Phaser from "phaser-ce";
import HeadDoctor from "../enemies/HeadDoctor";
import { WomanDoctor } from "../enemies/WomanDoctor";
import { AfroDoctor } from "../enemies/AfroDoctor";
import { GameState } from "../states/GameState";
import { FlyingDoctor } from "../enemies/FlyingDoctor";
import { MathHelper } from "./MathHelper";

export class EnemyHelper {

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
        let random: number = MathHelper.getRandomNumber(3, 5);
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
        let chance: number = MathHelper.getRandomNumber(1, 6);
        let xOffSet: number = MathHelper.getRandomNumber(150, 200);
        let xPixelPos: number = (14 * 64) + (xOffSet * rowPosition);
        let yPixelPos: number = y * 64;
        if (chance <= 3) {
            let headDoctor: HeadDoctor = new HeadDoctor(this.gameState);
            this.enemiesGroup.add(headDoctor);
            headDoctor.spawn(xPixelPos, yPixelPos + headDoctor.body.height / 4);
        } else if (chance > 3 && chance < 5) {
            let womanDoctor: WomanDoctor = new WomanDoctor(this.gameState);
            this.enemiesGroup.add(womanDoctor);
            womanDoctor.spawn(xPixelPos, yPixelPos + womanDoctor.body.height / 4);
        } else if (chance === 5) {
            let afroDoctor: AfroDoctor = new AfroDoctor(this.gameState);
            this.enemiesGroup.add(afroDoctor);
            afroDoctor.spawn(xPixelPos, yPixelPos + afroDoctor.body.height / 4);
        } else if (chance === 6) {
            let flyingDoctor: FlyingDoctor = new FlyingDoctor(this.gameState);
            this.enemiesGroup.add(flyingDoctor);
            flyingDoctor.spawn(xPixelPos, yPixelPos + flyingDoctor.body.height / 4);
        }
    }
}

export default EnemyHelper;