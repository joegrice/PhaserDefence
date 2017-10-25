var Models;
(function (Models) {
    var Tower = /** @class */ (function () {
        function Tower(game, x, y, spriteName, group) {
            this.lastShotAt = 0;
            this.game = game;
            this.xPos = x;
            this.yPos = y;
            this.sprite = this.game.add.sprite(x, y, spriteName);
            group.add(this.sprite);
            //  Creates 30 bullets, using the 'bullet' graphic
            this.weapon = this.game.add.weapon(30, "bullet");
            //  The bullet will be automatically killed when it leaves the world bounds
            //  The speed at which the bullet is fired
            this.weapon.bulletSpeed = 400;
            //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
            this.weapon.fireRate = 600;
            // Enable the bullet physics
            this.game.physics.arcade.enable(spriteName);
            // Set angle will come out of tower
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
            this.weapon.trackSprite(this.sprite, 32, 32);
        }
        Tower.prototype.canShoot = function () {
            return this.timeSinceLastShot() > this.weapon.fireRate;
        };
        ;
        Tower.prototype.timeSinceLastShot = function () {
            return new Date().getTime() - this.lastShotAt;
        };
        ;
        Tower.prototype.shoot = function () {
            this.lastShotAt = new Date().getTime();
            //this.sprite.animations.play("SHOOT_ANIMATION");
            //this.game.audio.AUDIO_NAME.play();
            this.weapon.fire();
        };
        ;
        return Tower;
    }());
    Models.Tower = Tower;
})(Models || (Models = {}));
//# sourceMappingURL=Tower.js.map