module Models {
    export class Tower {
        xPos: number;
        yPos: number;
        game: Phaser.Game;
        sprite: Phaser.Sprite;
        weapon: Phaser.Weapon;
        lastShotAt: number = 0;

        constructor(game: Phaser.Game, x: number, y: number, sprite: Phaser.Sprite, towerGroup: Phaser.Group, bullets: Phaser.Group) {
            this.game = game;
            this.xPos = x;
            this.yPos = y;
            this.sprite = sprite;
            towerGroup.add(this.sprite);

            this.weapon = this.game.add.weapon(10, "smallbullet", undefined, bullets);
            this.weapon.bulletSpeed = 400;
            this.weapon.fireRate = 6000;
            this.game.physics.arcade.enable(sprite);
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.trackSprite(this.sprite, 32, 32);
        }

        canShoot() {
            return this.timeSinceLastShot() > this.weapon.fireRate;
        };

        timeSinceLastShot() {
            return new Date().getTime() - this.lastShotAt;
        };

        shoot() {
            this.lastShotAt = new Date().getTime();
            //this.sprite.animations.play("SHOOT_ANIMATION");
            //this.game.audio.AUDIO_NAME.play();
            this.weapon.fire();
        };
    }
}