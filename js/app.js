var Game;
(function (Game) {
    var GameMain = /** @class */ (function () {
        function GameMain() {
            this.game = new Phaser.Game(960, 640, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, render: this.render, update: this.update
            });
        }
        GameMain.prototype.preload = function () {
            this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image("tileset", "assets/tile2map64.png");
            this.game.load.image("tower", "assets/tower.png");
            this.game.load.image("bullet", "assets/bullet.png");
        };
        GameMain.prototype.create = function () {
            var _this = this;
            this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
            this.map.addTilesetImage("tileset", "tileset");
            this.layer = this.map.createLayer("Tile Layer 1");
            this.layer.resizeWorld();
            this.towerList = new Array();
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0xffffff, 1);
            this.marker.drawRect(0, 0, 64, 64);
            this.game.input.addMoveCallback(function (pointer, x, y) {
                _this.marker.x = _this.layer.getTileX(x) * 64;
                _this.marker.y = _this.layer.getTileY(y) * 64;
                //console.log(`Hover: X= ${this.marker.x / 64} Y= ${this.marker.y}`);
            }, this);
            this.game.input.onDown.add(function () {
                GameMain.prototype.addTowerToTile(_this.game, _this.towerList, _this.marker.x, _this.marker.y, _this.towers);
            }, this);
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        GameMain.prototype.addTowerToTile = function (game, towerList, x, y, group) {
            /*var x = GameMain.prototype.layer.getTileX(this.game.input.activePointer.worldX);
            var y = GameMain.prototype.layer.getTileY(this.game.input.activePointer.worldY);
            var tile = this.map.getTile(x, y, this.layer);*/
            var towerOnTile = GameMain.prototype.towerOnTile(towerList, x, y);
            if (!towerOnTile) {
                towerList.push(new Models.Tower(game, x, y, "tower", group));
            }
        };
        GameMain.prototype.towerOnTile = function (towerList, x, y) {
            var towerOnTile = false;
            if (towerList != null && towerList.length > 0) {
                for (var i = 0; i < towerList.length; i++) {
                    if (towerList[i].xPos === x && towerList[i].yPos === y) {
                        towerOnTile = true;
                        break;
                    }
                }
            }
            return towerOnTile;
        };
        GameMain.prototype.update = function () {
            if (this.cursors.left.isDown) {
                this.game.camera.x -= 4;
            }
            else if (this.cursors.right.isDown) {
                this.game.camera.x += 4;
            }
            if (this.cursors.up.isDown) {
                this.game.camera.y -= 4;
            }
            else if (this.cursors.down.isDown) {
                this.game.camera.y += 4;
            }
            for (var i = 0; i < this.towerList.length; i++) {
                this.towerList[i].sprite.body.velocity.x = 0;
                this.towerList[i].shoot();
            }
        };
        GameMain.prototype.render = function () {
            for (var i = 0; i < this.towerList.length; i++) {
                this.towerList[i].weapon.debug();
            }
        };
        return GameMain;
    }());
    Game.GameMain = GameMain;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.GameMain();
};
//# sourceMappingURL=app.js.map