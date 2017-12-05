import * as Phaser from "phaser-ce";
import GlobalState from "../models/GlobalState";

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
        this.game.load.text("layout", "assets/data/layout.json");
        this.game.load.text("highscores", "assets/data/highscores.json");
        this.game.load.atlasJSONArray("headDoctor", "assets/headDoctor.png", "assets/headDoctor.json");
        this.game.load.spritesheet("enemyWomanDoctor", "assets/enemyWomanDoctor.png", 67, 94, 16);
        this.game.load.spritesheet("afroDoctor", "assets/afroDoctor.png", 68, 100, 15);
        this.game.load.spritesheet("flyingDoctor", "assets/flyingDoctor.png", 68, 94, 18);
    }

    create(): void {
        GlobalState.resetStats();
        this.game.state.start("GameState");
    }
}

export default PreloadState;