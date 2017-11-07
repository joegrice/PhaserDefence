module Game {
    export class GameRunningState extends Phaser.State {
        constructor() {
            super();
        }
        game: Phaser.Game;
        map: Phaser.Tilemap;
        marker: Phaser.Graphics;
        layer: Phaser.TilemapLayer;
        wallLayer: Phaser.TilemapLayer;
        towers: Phaser.Group;
        bullets: Phaser.Group;
        weapon: Phaser.Weapon;
        towerList: Array<Models.Tower>;
        enemiesGroup: Phaser.Group;
        bulletTime: number;
        money: number;
        moneyText: Phaser.Text;

        preload() {
            this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image("tile2map64", "assets/tile2map64.png");
            this.game.load.image("towerDefense_tilesheet", "assets/towerDefense_tilesheet.png");
            this.game.load.image("tower", "assets/tower.png");
            this.game.load.image("bullet", "assets/bullet.png");
            this.game.load.atlasJSONArray("enemy1", "assets/enemy1.png", "assets/enemy1.json");
        }

        create() {
            // Map
            this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
            this.map.addTilesetImage("tile2map64", "tile2map64");
            this.map.addTilesetImage("towerDefense_tilesheet", "towerDefense_tilesheet");
            this.layer = this.map.createLayer("Tile Layer 1");
            this.wallLayer = this.map.createLayer("wall");
            this.layer.resizeWorld();

            // UI
            this.money = 0;
            this.moneyText = this.game.add.text(32, 24, "Money: " + this.money);
            this.moneyText.fontSize = 16;
            this.setUpTowerBar();

            // Group
            this.towerList = new Array<Models.Tower>();
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
            this.bullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "bullets");            

            // Marker
            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0xffffff, 1);
            this.marker.drawRect(0, 0, 64, 64);

            // Enemeies
            this.enemiesGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "enemies");
            this.createDoctors();

            // Callbacks
            this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
                this.marker.x = this.layer.getTileX(x) * 64;
                this.marker.y = this.layer.getTileY(y) * 64;
            }, this);

            /*this.game.input.onDown.add(() => {
                this.addTowerToTile();
            }, this);*/
        }

        setUpTowerBar() {
            this.setUpDraggableTower(3, 7, "tower");
        }

        setUpDraggableTower(x, y, spriteName) {
            let redTower = this.createTowerSpriteAtTile(x, y, spriteName);
            redTower.inputEnabled = true;
            redTower.input.enableDrag();
            redTower.input.enableSnap(64, 64, false, true);
            redTower.events.onDragStop.add(this.towerOnDragStop, this);
        }

        createTowerSpriteAtTile(x, y, spriteName) : Phaser.Sprite {
            return this.game.add.sprite(x * 64, y * 64, spriteName);
        }

        createDoctors() {
            for (let y = 1; y < 7; y++) {
                let rand = Math.floor((Math.random() * 10) + 1);
                for (let z = 0; z < rand; z++) {
                    this.enemiesGroup.add(new Enemy.Doctor(this.game));
                    let doc = this.enemiesGroup.getFirstExists(false);
                    doc.spawn((11 * 64) + z * (rand * 15), (y * 64) + doc.body.height / 4);
                }
            }
        }

        towerOnDragStop(sprite: Phaser.Sprite, event) {
            let tile = this.getTileOnMap(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
            let towerOnTile = this.towerOnTile(tile);
            if (!towerOnTile) {
                sprite.input.draggable = false;                
                this.towerList.push(new Models.Tower(this.game, tile.worldX, tile.worldY, sprite, this.towers, this.bullets));
                let previousTile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
                this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key);
            } else {
                sprite.position = sprite.input.dragStartPoint;
            }
        }

        getTileOnMap(x: number, y: number) : Phaser.Tile {
            var tileX = this.layer.getTileX(x);
            var tileY = this.layer.getTileY(y);
            return this.map.getTile(tileX, tileY, this.layer);
        }

        towerOnTile(tile: Phaser.Tile) {
            let towerOnTile = false;
            if (this.towerList != null && this.towerList.length > 0) {
                for (let i = 0; i < this.towerList.length; i++) {
                    var towerListTile = this.getTileOnMap(this.towerList[i].xPos, this.towerList[i].yPos)
                    if (towerListTile.x === tile.x && towerListTile.y === tile.y) {
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
            this.game.physics.arcade.overlap(this.bullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);            
            this.game.physics.arcade.overlap(this.towers, this.enemiesGroup, this.towerEnemyCollisionHandler, null, this);            
        }

        bulletEnemyCollisionHandler(bullet, enemy) {
            // Check enemy and bullet are on the same Y axis
            let bullety = this.layer.getTileY(bullet.world.y);
            let enemyy = this.layer.getTileY(enemy.world.y);
            if (bullety === enemyy) {
                enemy.hit(bullet);
                this.updateMoney(enemy.moneyValue);
            }
        }

        towerEnemyCollisionHandler(tower, enemy) {
            let towery = this.layer.getTileY(tower.world.y);
            let enemyy = this.layer.getTileY(enemy.world.y);
            if(towery === enemyy) {
                console.log("Tower hit.")
            }
        }

        updateMoney(amount: number) {
            this.money += amount;
            this.moneyText.text = "Money: " + this.money;
        }

        render() {
        }
    }
}