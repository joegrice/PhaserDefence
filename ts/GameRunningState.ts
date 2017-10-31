module Game {
    export class GameRunningState extends Phaser.State {
        constructor() {
            super();
        }
        game: Phaser.Game;
        map: Phaser.Tilemap;
        marker: Phaser.Graphics;
        cursors: Phaser.CursorKeys;
        layer: Phaser.TilemapLayer;
        wallLayer: Phaser.TilemapLayer;
        towers: Phaser.Group;
        weapon: Phaser.Weapon;
        towerList: Array<Models.Tower>;

        preload() {
            this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image("tile2map64", "assets/tile2map64.png");
            this.game.load.image("towerDefense_tilesheet", "assets/towerDefense_tilesheet.png");
            this.game.load.image("tower", "assets/tower.png");
            this.game.load.image("bullet", "assets/bullet.png");
            this.game.load.atlasJSONHash("enemy1", "assets/enemy1.png", "assets/enemy1.json");
        }

        create() {
            this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
            this.map.addTilesetImage("tile2map64", "tile2map64");
            this.map.addTilesetImage("towerDefense_tilesheet", "towerDefense_tilesheet");
            this.layer = this.map.createLayer("Tile Layer 1");
            this.wallLayer = this.map.createLayer("wall");
            this.layer.resizeWorld();

            this.towerList = new Array<Models.Tower>();
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
            //this.towers = this.game.add.group(Phaser.Physics.ARCADE, "towers", true, true);

            /*var enemy1 = this.game.add.sprite(200, 200, "enemy1");
            enemy1.animations.add('walk');
            enemy1.animations.play('walk', 15, true);*/

            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0xffffff, 1);
            this.marker.drawRect(0, 0, 64, 64);

            this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
                this.marker.x = this.layer.getTileX(x) * 64;
                this.marker.y = this.layer.getTileY(y) * 64;
                //console.log(`Hover: X= ${this.marker.x / 64} Y= ${this.marker.y}`);
            }, this);

            this.game.input.onDown.add(() => {
                this.addTowerToTile();
            }, this);

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        addTowerToTile() {
            var x = this.layer.getTileX(this.game.input.activePointer.worldX) * 64;
            var y = this.layer.getTileX(this.game.input.activePointer.worldY) * 64;
            var tile = this.map.getTile(x, y, this.layer);
            let towerOnTile = this.towerOnTile(x, y);
            if (!towerOnTile) {
                this.towerList.push(new Models.Tower(this.game, x, y, this.towers));
            }
        }

        towerOnTile(x: number, y: number) {
            let towerOnTile = false;
            if (this.towerList != null && this.towerList.length > 0) {
                for (let i = 0; i < this.towerList.length; i++) {
                    if (this.towerList[i].xPos === x && this.towerList[i].yPos === y) {
                        towerOnTile = true;
                        break;
                    }
                }
            }
            return towerOnTile;
        }

        update() {
            for (var i = 0; i < this.towerList.length; i++) {
                this.towerList[i].sprite.body.velocity.x = 0;
                this.towerList[i].shoot();
            }
        }

        render() {
        }
    }
}