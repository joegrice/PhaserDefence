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
        smallBullets: Phaser.Group;
        bigBullets: Phaser.Group;
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
            this.game.load.image("redtower", "assets/redtower.png");
            this.game.load.image("greentower", "assets/greentower.png");
            this.game.load.image("smallgreentower", "assets/smallgreentower.png");
            this.game.load.image("smallyellowtower", "assets/smallyellowtower.png");
            this.game.load.image("smallbullet", "assets/smallbullet.png");
            this.game.load.image("bigbullet", "assets/bigbullet.png");
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
            this.smallBullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "smallBullets");
            this.smallBullets.classType = Models.SmallTowerBullet;
            this.smallBullets.createMultiple(50, "smallbullet");
            this.smallBullets.setAll('outOfBoundsKill', true);
            this.smallBullets.setAll('checkWorldBounds', true);
            this.bigBullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "bigBullets");
            this.bigBullets.classType = Models.BigTowerBullet;
            this.bigBullets.createMultiple(50, "bigbullet");
            this.bigBullets.setAll('outOfBoundsKill', true);
            this.bigBullets.setAll('checkWorldBounds', true);

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
        }

        setUpTowerBar() {
            this.setUpDraggableTower(3, 7, "redtower");
            this.setUpDraggableTower(4, 7, "greentower");
            this.setUpDraggableTower(5, 7, "smallyellowtower");
            this.setUpDraggableTower(6, 7, "smallgreentower");
        }

        setUpDraggableTower(x, y, spriteName) {
            let tower = this.createTowerSpriteAtTile(x, y, spriteName);
            tower.inputEnabled = true;
            tower.input.enableSnap(64, 64, false, true);            
            tower.input.enableDrag();
            tower.events.onDragStop.add(this.towerOnDragStop, this);
        }

        createTowerSpriteAtTile(x, y, spriteName): Phaser.Sprite {
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
            let tile = this.getTileOnMap(this.game.input.activePointer.x, this.game.input.activePointer.y);
            let towerOnTile = this.towerOnTile(tile);
            if (!towerOnTile) {
                sprite.input.draggable = false;
                sprite.x = tile.x * 64;
                sprite.y = tile.y * 64;
                this.towerList.push(this.getTowerObject(this.game, sprite, this.towers));
                let previousTile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
                this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key);
            } else {
                sprite.kill();
                let previousTile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
                this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key);
            }            
        }

        getTowerObject(game: Phaser.Game, sprite: Phaser.Sprite, towerGroup: Phaser.Group) {
            switch (sprite.key.toString()) {
                case "redtower":
                    return new Models.RedTower(game, sprite, towerGroup, this.bigBullets);
                case "greentower":
                    return new Models.GreenTower(game, sprite, towerGroup, this.bigBullets);
                case "smallgreentower":
                    return new Models.SmallGreenTower(game, sprite, towerGroup, this.smallBullets);
                case "smallyellowtower":
                    return new Models.SmallYellowTower(game, sprite, towerGroup, this.smallBullets);
            }
        }

        getTileOnMap(x: number, y: number): Phaser.Tile {
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
                this.towerList[i].update();
            }
            this.game.physics.arcade.overlap(this.smallBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
            this.game.physics.arcade.overlap(this.bigBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
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
            if (towery === enemyy) {
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