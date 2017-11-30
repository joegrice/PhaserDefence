class GameState extends Phaser.State {

    map: Phaser.Tilemap;
    marker: Phaser.Graphics;
    layer: Phaser.TilemapLayer;
    wallLayer: Phaser.TilemapLayer;
    towers: Phaser.Group;
    smallBullets: Phaser.Group;
    bigBullets: Phaser.Group;
    enemiesGroup: Phaser.Group;
    moneyText: Phaser.Text;
    layout: Layout;

    constructor() {
        super();
    }

    create(): void {
        // map
        this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
        this.map.addTilesetImage("tile2map64", "tile2map64");
        this.map.addTilesetImage("towerDefense_tilesheet", "towerDefense_tilesheet");
        this.layer = this.map.createLayer("Tile Layer 1");
        this.wallLayer = this.map.createLayer("wall");
        this.layer.resizeWorld();
        this.game.physics.arcade.enable(this.wallLayer);
        this.map.setCollisionBetween(0, 10000, true, this.wallLayer);

        // ui
        this.moneyText = this.game.add.text(32, 24, "Money: " + GlobalState.money);
        this.moneyText.fontSize = 16;
        this.layout = JSON.parse(this.game.cache.getText("layout"));

        // group
        this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
        this.towers.classType = Tower;
        this.smallBullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "smallBullets");
        this.smallBullets.classType = SmallTowerBullet;
        this.smallBullets.createMultiple(50, "smallbullet");
        this.smallBullets.setAll("outOfBoundsKill", true);
        this.smallBullets.setAll("checkWorldBounds", true);
        this.bigBullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "bigBullets");
        this.bigBullets.classType = BigTowerBullet;
        this.bigBullets.createMultiple(50, "bigbullet");
        this.bigBullets.setAll("outOfBoundsKill", true);
        this.bigBullets.setAll("checkWorldBounds", true);

        // marker
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0xffffff, 1);
        this.marker.drawRect(0, 0, 64, 64);

        // enemeies
        this.enemiesGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "enemies");
        this.smallBullets.classType = Enemy;

        // callbacks
        this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
            this.marker.x = this.layer.getTileX(x) * 64;
            this.marker.y = this.layer.getTileY(y) * 64;
        }, this);

        // level
        this.setUpTowerBar();
        this.updateLevel();
    }

    setUpTowerBar(): void {
        this.layout.towerBar.forEach(towerSetup => {
            this.setUpDraggableTower(towerSetup.position.x, towerSetup.position.y, towerSetup.name);
        });
    }

    setUpDraggableTower(x: number, y: number, spriteName: string): void {
        let tower: Tower = this.getTowerObject(this.game, spriteName, x * 64, y * 64);
        this.game.add.existing(tower);
        tower.events.onDragStop.add(this.towerOnDragStop, this);
    }

    createDoctors(randomMax: number): void {
        this.enemiesGroup.removeAll();
        for (let y: number = 1; y < 7; y++) {
            let rand: number = Math.floor((Math.random() * randomMax) + 1);
            for (let z: number = 0; z < rand; z++) {
                this.enemiesGroup.add(new Doctor(this.game));
                let doc: Doctor = this.enemiesGroup.getFirstExists(false);
                doc.spawn((14 * 64) + z * (rand * 15), (y * 64) + doc.body.height / 4);
            }
        }
    }

    towerOnDragStop(tower: Tower, event: Phaser.Pointer): void {
        let tile: Phaser.Tile = this.getTileOnMap(this.game.input.activePointer.x, this.game.input.activePointer.y);
        let towerOnTile: boolean = this.towerOnTile(tile);
        let isPositionForbidden: boolean = this.isPositionForbidden(tile.x, tile.y);
        let canAffordTower: boolean = this.canAffordTower(tower);
        if (!towerOnTile && !isPositionForbidden && canAffordTower) {
            tower.reset(tile.x * 64, tile.y * 64);
            tower.addFireEvent();
            this.towers.add(tower);
            this.placeTowerBackOnBar(tower);
            this.subtractMoney(tower.price);
        } else {
            this.displayError("Not enough money, item cost: " + tower.price);
            tower.reset(tower.input.dragStartPoint.x, tower.input.dragStartPoint.y);
        }
    }

    canAffordTower(tower: Tower): boolean {
        let canAffordTower: boolean = false;
        if (GlobalState.money >= tower.price) {
            canAffordTower = true;
        }
        return canAffordTower;
    }

    placeTowerBackOnBar(sprite: Phaser.Sprite): void {
        let previousTile: Phaser.Tile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
        this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key.toString());
    }

    getTowerObject(game: Phaser.Game, spriteName: string, x: number, y: number): Tower {
        let tower: ITowerState = GlobalState.towers.find(tower => tower.key === spriteName);
        return new tower.type(this, x, y);
    }

    getTileOnMap(x: number, y: number): Phaser.Tile {
        var tileX: number = this.layer.getTileX(x);
        var tileY: number = this.layer.getTileY(y);
        return this.map.getTile(tileX, tileY, this.layer);
    }

    towerOnTile(tile: Phaser.Tile): boolean {
        let towerOnTile: boolean = false;
        if (this.towers != null && this.towers.length > 0) {
            for (let i: number = 0; i < this.towers.length; i++) {
                var towersTile: Phaser.Tile = this.getTileOnMap(this.towers.getChildAt(i).x, this.towers.getChildAt(i).y);
                if (towersTile.x === tile.x && towersTile.y === tile.y) {
                    towerOnTile = true;
                    break;
                }
            }
        }
        return towerOnTile;
    }

    isPositionForbidden(x: number, y: number): boolean {
        let isForbidden: boolean = false;
        this.layout.forbiddenTiles.forEach(mapPos => {
            if (x === mapPos.x && y === mapPos.y) {
                isForbidden = true;
            }
        });
        return isForbidden;
    }

    displayError(text: string): void {
        let errorText: string = "Error: " + text;
        var playText: Phaser.Text = this.game.add.text(450, 25, errorText, { font: "15px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;
        this.game.add.tween(playText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    updateLevel(): void {
        let levelText: string = "Level: " + GlobalState.level;
        var playText: Phaser.Text = this.game.add.text(this.game.width / 2, 250, levelText, { font: "50px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;
        this.game.add.tween(playText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.addMoney(100);
        this.clearPlacedTiles();
        this.createDoctors(GlobalState.level * 5);
    }

    clearPlacedTiles(): void {
        this.towers.filter(tower => tower).callAll("die");
    }

    update(): void {
        this.game.physics.arcade.overlap(this.smallBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.bigBullets, this.enemiesGroup, this.bulletEnemyCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.towers, this.enemiesGroup, this.towerEnemyCollisionHandler, null, this);
        this.game.physics.arcade.collide(this.wallLayer, this.enemiesGroup, this.wallEnemyCollisionHandler, null, this);
    }

    bulletEnemyCollisionHandler(bullet: TowerBullet, enemy: Enemy): void {
        // check enemy and bullet are on the same Y axis
        let bulletY: number = this.layer.getTileY(bullet.world.y);
        let enemyY: number = this.layer.getTileY(enemy.world.y);
        if (bulletY === enemyY) {
            enemy.hitBullet(bullet);
            this.addMoney(enemy.moneyValue);
        }
    }

    wallEnemyCollisionHandler(enemy: Enemy, wall: Phaser.Tile): void {
        this.game.state.start("GameOverState", true, true);
    }

    towerEnemyCollisionHandler(tower: Tower, enemy: Enemy): void {
        let towerY: number = this.layer.getTileY(tower.y);
        let enemyY: number = this.layer.getTileY(enemy.y);
        if (towerY === enemyY) {
            enemy.hitTower(tower);
            tower.hitEnemy(enemy);
        }
    }

    addMoney(amount: number): void {
        GlobalState.money += amount;
        this.moneyText.text = "Money: " + GlobalState.money;
    }

    subtractMoney(amount: number): void {
        GlobalState.money -= amount;
        this.moneyText.text = "Money: " + GlobalState.money;
    }
}