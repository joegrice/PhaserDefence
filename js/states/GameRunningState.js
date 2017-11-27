var Game;
(function (Game) {
    class GameState extends Phaser.State {
        constructor() {
            super();
        }
        preload() {
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
            this.layout = JSON.parse(this.game.cache.getText('layout'));
            this.setUpTowerBar();
            // Group
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
            this.towers.classType = Models.Tower;
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
            this.smallBullets.classType = Enemy.Enemy;
            this.createDoctors();
            // Callbacks
            this.game.input.addMoveCallback((pointer, x, y) => {
                this.marker.x = this.layer.getTileX(x) * 64;
                this.marker.y = this.layer.getTileY(y) * 64;
            }, this);
        }
        setUpTowerBar() {
            this.layout.towerBar.forEach(towerSetup => {
                this.setUpDraggableTower(towerSetup.position.x, towerSetup.position.y, towerSetup.name);
            });
        }
        setUpDraggableTower(x, y, spriteName) {
            let tower = this.createTowerSpriteAtTile(x, y, spriteName);
            tower.inputEnabled = true;
            tower.input.enableSnap(64, 64, false, true);
            tower.input.enableDrag();
            tower.events.onDragStop.add(this.towerOnDragStop, this);
        }
        createTowerSpriteAtTile(x, y, spriteName) {
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
        towerOnDragStop(sprite, event) {
            let tile = this.getTileOnMap(this.game.input.activePointer.x, this.game.input.activePointer.y);
            let towerOnTile = this.towerOnTile(tile);
            if (!towerOnTile) {
                sprite.input.draggable = false;
                this.towers.add(this.getTowerObject(this.game, sprite, tile.x * 64, tile.y * 64));
                this.placeTowerBackOnBar(sprite);
            }
            else {
                this.placeTowerBackOnBar(sprite);
            }
        }
        placeTowerBackOnBar(sprite) {
            let previousTile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
            this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key);
            sprite.kill();
        }
        getTowerObject(game, sprite, x, y) {
            switch (sprite.key.toString()) {
                case "redtower":
                    return new Models.RedTower(game, x, y, this.bigBullets);
                case "greentower":
                    return new Models.GreenTower(game, x, y, this.bigBullets);
                case "smallgreentower":
                    return new Models.SmallGreenTower(game, x, y, this.smallBullets);
                case "smallyellowtower":
                    return new Models.SmallYellowTower(game, x, y, this.smallBullets);
            }
        }
        getTileOnMap(x, y) {
            var tileX = this.layer.getTileX(x);
            var tileY = this.layer.getTileY(y);
            return this.map.getTile(tileX, tileY, this.layer);
        }
        towerOnTile(tile) {
            let towerOnTile = false;
            if (this.towers != null && this.towers.length > 0) {
                for (let i = 0; i < this.towers.length; i++) {
                    var towersTile = this.getTileOnMap(this.towers.getChildAt(i).x, this.towers.getChildAt(i).y);
                    if (towersTile.x === tile.x && towersTile.y === tile.y) {
                        towerOnTile = true;
                        break;
                    }
                }
            }
            return towerOnTile;
        }
        update() {
            this.game.physics.arcade.overlap(this.smallBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
            this.game.physics.arcade.overlap(this.bigBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
            this.game.physics.arcade.overlap(this.towers, this.enemiesGroup, this.towerEnemyCollisionHandler, null, this);
            this.game.physics.arcade.overlap(this.wallLayer, this.enemiesGroup, this.towerEnemyCollisionHandler, null, this);
        }
        bulletEnemyCollisionHandler(bullet, enemy) {
            // Check enemy and bullet are on the same Y axis
            let bullety = this.layer.getTileY(bullet.world.y);
            let enemyy = this.layer.getTileY(enemy.world.y);
            if (bullety === enemyy) {
                enemy.hitBullet(bullet);
                this.updateMoney(enemy.moneyValue);
            }
        }
        wallEnemyCollisionHandler(wall, enemy) {
            this.game.state.start('GameOverState');
        }
        towerEnemyCollisionHandler(tower, enemy) {
            let towery = this.layer.getTileY(tower.y);
            let enemyy = this.layer.getTileY(enemy.y);
            if (towery === enemyy) {
                enemy.hitTower(tower);
                tower.hitEnemy(enemy);
            }
        }
        updateMoney(amount) {
            this.money += amount;
            this.moneyText.text = "Money: " + this.money;
        }
        render() {
        }
    }
    Game.GameState = GameState;
})(Game || (Game = {}));
//# sourceMappingURL=GameRunningState.js.map