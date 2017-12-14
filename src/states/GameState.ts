import * as Phaser from "phaser-ce";
import { Configs } from "../data/Configs";
import Tower from "../towers/Tower";
import Enemy from "../enemies/Enemy";
import TowerBullet from "../bullets/TowerBullet";
import { ITowerConfig } from "../towers/ITowerConfig";
import { EnemyFactory } from "../enemies/EnemyFactory";
import { ITowerBulletConfig } from "../bullets/ITowerBulletConfig";
import { MapPosition, ForbiddenTiles } from "../models/ForbiddenTiles";

export class GameState extends Phaser.State {

    map: Phaser.Tilemap;
    highlighter: Phaser.Graphics;
    layer: Phaser.TilemapLayer;
    wallLayer: Phaser.TilemapLayer;
    towers: Phaser.Group;
    bullets: Phaser.Group;
    enemies: Phaser.Group;
    moneyText: Phaser.Text;
    scoreText: Phaser.Text;
    forbiddenTiles: ForbiddenTiles;

    constructor() {
        super();
    }

    create(): void {
        this.createMap();
        this.createSelectedTileHighlighter();
        this.createTowersGroup();
        this.createEnemiesGroup();
        this.createBulletsGroup();
        this.setUpTowerBar();
        this.createUiText();
        this.updateLevel();
        this.importData();
    }

    importData(): void {
        this.forbiddenTiles = JSON.parse(this.game.cache.getText("forbiddentiles"));
    }

    createUiText(): void {
        this.moneyText = this.game.add.text(32, 24, "Money: " + Configs.money);
        this.moneyText.fontSize = 16;
        this.scoreText = this.game.add.text(160, 24, "Score: " + Configs.score);
        this.scoreText.fontSize = 16;
    }

    createTowersGroup(): void {
        this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
        this.towers.classType = Tower;
    }

    createEnemiesGroup(): void {
        this.enemies = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "enemies");
        this.enemies.classType = Enemy;
    }

    createBulletsGroup(): void {
        this.bullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "bullets");
        this.bullets.classType = TowerBullet;
        this.bullets.setAll("outOfBoundsKill", true);
        this.bullets.setAll("checkWorldBounds", true);
        this.populateBulletGroup(40, "bigbullet");
        this.populateBulletGroup(40, "smallbullet");
    }

    createSelectedTileHighlighter(): void {
        this.highlighter = this.game.add.graphics();
        this.highlighter.lineStyle(2, 0xffffff, 1);
        this.highlighter.drawRect(0, 0, 64, 64);

        this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
            this.highlighter.x = this.layer.getTileX(x) * 64;
            this.highlighter.y = this.layer.getTileY(y) * 64;
        }, this);
    }

    createMap(): void {
        this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
        this.map.addTilesetImage("tile2map64", "tile2map64");
        this.map.addTilesetImage("towerDefense_tilesheet", "towerDefense_tilesheet");
        this.layer = this.map.createLayer("Tile Layer 1");
        this.wallLayer = this.map.createLayer("wall");
        this.layer.resizeWorld();
        this.game.physics.arcade.enable(this.wallLayer);
        this.map.setCollisionBetween(0, 10000, true, this.wallLayer);
    }

    populateBulletGroup(numBullets: number, bulletKey: string): void {
        let bulletConfig: ITowerBulletConfig = Configs.bullets.find(bulletConfig => bulletConfig.spriteKey === bulletKey);
        for (let i: number = 0; i < numBullets; i++) {
            let towerBullet: TowerBullet = new TowerBullet(this.game, bulletConfig);
            this.bullets.add(towerBullet);
        }
    }

    setUpTowerBar(): void {
        Configs.towers.forEach(towerSetup => {
            this.setUpDraggableTower(towerSetup.barPosition.x, towerSetup.barPosition.y, towerSetup.spriteKey);
        });
    }

    setUpDraggableTower(x: number, y: number, spriteName: string): void {
        let tower: Tower = this.getTowerObject(spriteName, x * 64, y * 64);
        this.game.add.existing(tower);
        tower.events.onDragStop.add(this.towerOnDragStop, this);
    }

    towerOnDragStop(tower: Tower, event: Phaser.Pointer): void {
        let tile: Phaser.Tile = this.getTileOnMap(this.game.input.activePointer.x, this.game.input.activePointer.y);
        let towerOnTile: boolean = this.isTowerOnTile(tile);
        let isPositionForbidden: boolean = this.isPositionForbidden(tile.x, tile.y);
        let canAffordTower: boolean = this.canAffordTower(tower);
        if (!towerOnTile && !isPositionForbidden && canAffordTower) {
            tower.place(tile.x * 64, tile.y * 64);
            this.placeTowerBackOnBar(tower);
        } else {
            this.updateMessage("Not enough money, item cost: " + tower.towerConfig.price);
            tower.reset(tower.input.dragStartPoint.x, tower.input.dragStartPoint.y);
        }
    }

    isOnSameRow(y1: number, y2: number, layer: Phaser.TilemapLayer): boolean {
        let isOnSameRow: boolean = false;
        let towerY: number = layer.getTileY(y1);
        let enemyY: number = layer.getTileY(y2);
        if (towerY === enemyY) {
            isOnSameRow = true;
        }
        return isOnSameRow;
    }

    isSpriteOnScreen(sprite: Phaser.Sprite): boolean {
        let isSpriteOnScreen: boolean = false;
        if (sprite.world.x < 768 && sprite.world.y < 448) {
            isSpriteOnScreen = true;
        }
        return isSpriteOnScreen;
    }

    isPositionForbidden(x: number, y: number): boolean {
        let isPositionForbidden: boolean = false;
        this.forbiddenTiles.mappositions.forEach((mapPos: MapPosition) => {
            if (x === mapPos.x && y === mapPos.y) {
                isPositionForbidden = true;
            }
        });
        return isPositionForbidden;
    }

    getTileOnMap(x: number, y: number): Phaser.Tile {
        var tileX: number = this.layer.getTileX(x);
        var tileY: number = this.layer.getTileY(y);
        return this.map.getTile(tileX, tileY, this.layer);
    }

    moveSpriteDownRow(sprite: Phaser.Sprite): void {
        let spriteTile: Phaser.Tile = this.getTileOnMap(sprite.world.x, sprite.world.y);
        if (!this.isPositionForbidden(spriteTile.x, spriteTile.y - 1)) {
            sprite.y -= 64;
        } else {
            this.moveSpriteUpRow(sprite);
        }
    }

    moveSpriteUpRow(sprite: Phaser.Sprite): void {
        let spriteTile: Phaser.Tile = this.getTileOnMap(sprite.world.x, sprite.world.y);
        if (!this.isPositionForbidden(spriteTile.x, spriteTile.y + 1)) {
            sprite.y += 64;
        } else {
            this.moveSpriteDownRow(sprite);
        }
    }

    canAffordTower(tower: Tower): boolean {
        let canAffordTower: boolean = false;
        if (Configs.money >= tower.towerConfig.price) {
            canAffordTower = true;
        }
        return canAffordTower;
    }

    placeTowerBackOnBar(sprite: Phaser.Sprite): void {
        let previousTile: Phaser.Tile = this.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y);
        this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key.toString());
    }

    getTowerObject(spriteName: string, x: number, y: number): Tower {
        let towerConfig: ITowerConfig = Configs.towers.find(tower => tower.spriteKey === spriteName);
        return new Tower(this, x, y, towerConfig);
    }

    isTowerOnTile(tile: Phaser.Tile): boolean {
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

    updateMessage(message: string): void {
        var playText: Phaser.Text = this.game.add.text(450, 25, message, { font: "15px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;
        this.game.add.tween(playText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    updateLevel(): void {
        let levelText: string = "Level: " + Configs.level;
        var playText: Phaser.Text = this.game.add.text(this.game.width / 2, 250, levelText, { font: "50px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;
        this.game.add.tween(playText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.addMoney(100);
        this.clearPlacedTowers();
        let enemyHelper: EnemyFactory = new EnemyFactory(this, this.enemies);
        enemyHelper.generateEnemies(Configs.level + 30);
    }

    clearPlacedTowers(): void {
        this.towers.filter(tower => tower).callAll("die");
    }

    update(): void {
        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletEnemyCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletEnemyCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.towers, this.enemies, this.towerEnemyCollisionHandler, null, this);
        this.game.physics.arcade.collide(this.wallLayer, this.enemies, this.wallEnemyCollisionHandler, null, this);
    }

    bulletEnemyCollisionHandler(bullet: TowerBullet, enemy: Enemy): void {
        if (this.isOnSameRow(bullet.world.y, enemy.world.y, this.layer)) {
            enemy.hitBullet(bullet);
            this.addScore(enemy.enemyConfig.scoreValue);
        }
    }

    wallEnemyCollisionHandler(enemy: Enemy, wall: Phaser.Tile): void {
        this.game.state.start("GameOverState", true, false);
    }

    towerEnemyCollisionHandler(tower: Tower, enemy: Enemy): void {
        if (this.isOnSameRow(tower.y, enemy.y, this.layer)) {
            enemy.hitTower(tower);
            tower.hitEnemy(enemy);
        }
    }

    addMoney(amount: number): void {
        Configs.money += amount;
        this.moneyText.text = "Money: " + Configs.money;
    }

    subtractMoney(amount: number): void {
        Configs.money -= amount;
        this.moneyText.text = "Money: " + Configs.money;
    }

    addScore(amount: number): void {
        Configs.score += amount;
        this.scoreText.text = "Score: " + Configs.score;
    }
}

export default GameState;