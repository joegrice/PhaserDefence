import * as Phaser from "phaser-ce";
import Tower from "./Tower";
import GlobalState from "../models/GlobalState";
import GameState from "../states/GameState";

export class SmallGreenTower extends Tower {

    constructor(gameState: GameState, x: number, y: number) {
        super(gameState, x, y);
        this.key = "smallgreentower";
        this.loadTexture("smallgreentower");

        this.healthVal = GlobalState.SmallGreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallGreenTowerState.bulletSpeed;
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 3, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}

export default SmallGreenTower;