module Models {
    export class TowerBullet extends Phaser.Sprite {
        attackDamage: number;

        constructor(game) {
            super(game, 0, 0);
        }
    }
}