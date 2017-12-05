import * as Phaser from "phaser-ce";
import { Layout } from "../models/Layout";
import GlobalState from "../models/GlobalState";
import Tower from "../towers/Tower";
import Enemy from "../enemies/Enemy";
import HeadDoctor from "../enemies/HeadDoctor";
import BigTowerBullet from "../bullets/BigTowerBullet";
import SmallTowerBullet from "../bullets/SmallTowerBullet";
import TowerBullet from "../bullets/TowerBullet";
import ITowerState from "../models/ITowerState";
import { TileHelper } from "../helpers/TileHelper";
import { WomanDoctor } from "../enemies/WomanDoctor";
import { AfroDoctor } from "../enemies/AfroDoctor";
import { EnemyHelper } from "../helpers/EnemyHelper";
import { MoneyHelper } from "../helpers/MoneyHelper";

export class GameState extends Phaser.State {

    map: Phaser.Tilemap;
    marker: Phaser.Graphics;
    layer: Phaser.TilemapLayer;
    wallLayer: Phaser.TilemapLayer;
    towers: Phaser.Group;
    smallBullets: Phaser.Group;
    bigBullets: Phaser.Group;
    enemiesGroup: Phaser.Group;
    moneyText: Phaser.Text;
    scoreText: Phaser.Text;
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
        this.scoreText = this.game.add.text(160, 24, "Score: " + GlobalState.score);
        this.scoreText.fontSize = 16;
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

    towerOnDragStop(tower: Tower, event: Phaser.Pointer): void {
        let tile: Phaser.Tile = TileHelper.getTileOnMap(this.game.input.activePointer.x, this.game.input.activePointer.y,
            this.layer, this.map);
        let towerOnTile: boolean = this.towerOnTile(tile);
        let isPositionForbidden: boolean = TileHelper.isPositionForbidden(tile.x, tile.y, this);
        let canAffordTower: boolean = this.canAffordTower(tower);
        if (!towerOnTile && !isPositionForbidden && canAffordTower) {
            tower.reset(tile.x * 64, tile.y * 64);
            tower.addFireEvent();
            this.towers.add(tower);
            this.placeTowerBackOnBar(tower);
            MoneyHelper.subtractMoney(tower.price, this.moneyText);
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
        let previousTile: Phaser.Tile = TileHelper.getTileOnMap(sprite.input.dragStartPoint.x, sprite.input.dragStartPoint.y,
            this.layer, this.map);
        this.setUpDraggableTower(previousTile.x, previousTile.y, sprite.key.toString());
    }

    getTowerObject(game: Phaser.Game, spriteName: string, x: number, y: number): Tower {
        let tower: ITowerState = GlobalState.towers.find(tower => tower.key === spriteName);
        return new tower.type(this, x, y);
    }

    towerOnTile(tile: Phaser.Tile): boolean {
        let towerOnTile: boolean = false;
        if (this.towers != null && this.towers.length > 0) {
            for (let i: number = 0; i < this.towers.length; i++) {
                var towersTile: Phaser.Tile = TileHelper.getTileOnMap(this.towers.getChildAt(i).x, this.towers.getChildAt(i).y,
                    this.layer, this.map);
                if (towersTile.x === tile.x && towersTile.y === tile.y) {
                    towerOnTile = true;
                    break;
                }
            }
        }
        return towerOnTile;
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

        MoneyHelper.addMoney(100, this.moneyText);
        this.clearPlacedTiles();
        let enemyHelper: EnemyHelper = new EnemyHelper(this, this.enemiesGroup);
        enemyHelper.generateEnemies(GlobalState.level + 30);
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
        if (TileHelper.onSameRow(bullet.world.y, enemy.world.y, this.layer)) {
            enemy.hitBullet(bullet);
            this.addScore(enemy.scoreValue);
        }
    }

    wallEnemyCollisionHandler(enemy: Enemy, wall: Phaser.Tile): void {
        this.game.state.start("GameOverState", true, false);
    }

    towerEnemyCollisionHandler(tower: Tower, enemy: Enemy): void {
        if (TileHelper.onSameRow(tower.y, enemy.y, this.layer)) {
            enemy.hitTower(tower);
            tower.hitEnemy(enemy);
        }
    }

    addScore(amount: number): void {
        GlobalState.score += amount;
        this.scoreText.text = "Score: " + GlobalState.score;
    }
}

export default GameState;