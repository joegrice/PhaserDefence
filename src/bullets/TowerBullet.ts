import * as Phaser from "phaser-ce";
import { ITowerBulletConfig } from "./ITowerBulletConfig";

export class TowerBullet extends Phaser.Sprite {

    attackDamage: number;

    constructor(game: Phaser.Game, bulletConfig: ITowerBulletConfig) {
        super(game, 0, 0, bulletConfig.spriteKey);
        this.attackDamage = bulletConfig.attackDamage;
        this.name = bulletConfig.spriteKey;
        this.exists = false;
    }
}

export default TowerBullet;