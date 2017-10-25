module Game {
    export class GameMain {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        marker: Phaser.Graphics;
        cursors: Phaser.CursorKeys;
        layer: Phaser.TilemapLayer;
        towers: Phaser.Group;
        weapon: Phaser.Weapon;
        towerList: Array<Models.Tower>;

        constructor() {
            this.game = new Phaser.Game(960, 640, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, render: this.render, update: this.update
            });
        }

        preload() {
            this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image("tileset", "assets/tile2map64.png");
            this.game.load.image("tower", "assets/tower.png");
            this.game.load.image("bullet", "assets/bullet.png");
        }

        create() {
            this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
            this.map.addTilesetImage("tileset", "tileset");
            this.layer = this.map.createLayer("Tile Layer 1");
            this.layer.resizeWorld();

            this.towerList = new Array<Models.Tower>();
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");

            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0xffffff, 1);
            this.marker.drawRect(0, 0, 64, 64);

            this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
                this.marker.x = this.layer.getTileX(x) * 64;
                this.marker.y = this.layer.getTileY(y) * 64;
                //console.log(`Hover: X= ${this.marker.x / 64} Y= ${this.marker.y}`);
            }, this);

            this.game.input.onDown.add(() => {
                GameMain.prototype.addTowerToTile(this.game, this.towerList, this.marker.x, this.marker.y, this.towers);
            }, this);

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        addTowerToTile(game: Phaser.Game, towerList: Array<Models.Tower>, x : number, y : number, group : Phaser.Group) {
            /*var x = GameMain.prototype.layer.getTileX(this.game.input.activePointer.worldX);
            var y = GameMain.prototype.layer.getTileY(this.game.input.activePointer.worldY);
            var tile = this.map.getTile(x, y, this.layer);*/
            let towerOnTile = GameMain.prototype.towerOnTile(towerList, x, y);
            if (!towerOnTile) {
                towerList.push(new Models.Tower(game, x, y, "tower", group));
            }
        }

        towerOnTile(towerList: Array<Models.Tower>, x : number, y : number) {
            let towerOnTile = false;
            if (towerList != null && towerList.length > 0) {
                for (let i = 0; i < towerList.length; i++) {
                    if (towerList[i].xPos === x && towerList[i].yPos === y) {
                        towerOnTile = true;
                        break;
                    }
                }
            }
            return towerOnTile;
        }

        update() {
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
        }

        render() {
            for (var i = 0; i < this.towerList.length; i++) {
                this.towerList[i].weapon.debug();
            }
        }
    }
}

window.onload = () => {
    var game = new Game.GameMain();
}