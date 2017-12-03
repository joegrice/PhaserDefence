import * as Phaser from "phaser-ce";

export class TowerBullet extends Phaser.Sprite {
    attackDamage: number;

    constructor(game: Phaser.Game) {
        super(game, 0, 0);
    }
}

export default TowerBullet;