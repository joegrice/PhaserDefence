import * as Phaser from "phaser-ce";
import Configs from "../data/Configs";

export class PreloadState extends Phaser.State {
    constructor() {
        super();
    }

    preload(): void {
        this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("tile2map64", "assets/tile2map64.png");
        this.game.load.image("towerDefense_tilesheet", "assets/towerDefense_tilesheet.png");
        this.game.load.image("redtower", "assets/redtower.png");
        this.game.load.image("greentower", "assets/greentower.png");
        this.game.load.image("smallgreentower", "assets/smallgreentower.png");
        this.game.load.image("smallyellowtower", "assets/smallyellowtower.png");
        this.game.load.image("smallbullet", "assets/smallbullet.png");
        this.game.load.image("bigbullet", "assets/bigbullet.png");
        this.game.load.image("apple_prop", "assets/apple_prop.png");
        this.game.load.image("shopbuybtn", "assets/shopbuybtn.png");
        this.game.load.image("shopitembg", "assets/shopitembg.png");
        this.game.load.image("returntogamebtn", "assets/returntogamebtn.png");
        this.game.load.text("forbiddentiles", "data/forbiddentiles.json");
        this.game.load.text("highscores", "data/highscores.json");
        this.game.load.atlasJSONArray("headDoctor", "assets/headDoctor.png", "assets/headDoctor.json");
        this.game.load.spritesheet("enemyWomanDoctor", "assets/enemyWomanDoctor.png", 67, 94, 16);
        this.game.load.spritesheet("afroDoctor", "assets/afroDoctor.png", 68, 100, 15);
        this.game.load.spritesheet("flyingDoctor", "assets/flyingDoctor.png", 68, 94, 18);
        this.game.load.audio("enemyhit", "assets/sounds/enemyhit.wav");
        this.game.load.audio("enemydeath", "assets/sounds/enemydeath.wav");
        this.game.load.audio("smallbulletfire", "assets/sounds/smallbulletfire.wav");
        this.game.load.audio("bigbulletfire", "assets/sounds/bigbulletfire.wav");
        this.game.load.audio("towerdeath", "assets/sounds/towerdeath.wav");
    }

    create(): void {
        Configs.resetStats();
        this.game.state.start("GameState");
    }
}

export default PreloadState;