module Models {
    export class RedTower extends Tower{
        constructor(game: Phaser.Game, x: number, y: number, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            super(game, x, y, sprite, towerGroup, bullets);

            this.weapon = this.game.add.weapon(10, "bigbullet", undefined, bullets);
            this.weapon.bulletSpeed = 400;
            this.weapon.fireRate = 4500;
            this.game.physics.arcade.enable(sprite);
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.trackSprite(this.sprite, 32, 32);
        }
    }
}