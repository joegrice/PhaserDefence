import * as Phaser from "phaser-ce";
import Tower from "./Tower";
import GlobalState from "../models/GlobalState";
import GameState from "../states/GameState";

export class GreenTower extends Tower {

    constructor(gameState: GameState, x: number, y: number) {
        super(gameState, x, y);
        this.key = "greentower";
        this.loadTexture("greentower");

        this.healthVal = GlobalState.GreenTowerState.healthVal;
        this.bulletSpeed = GlobalState.GreenTowerState.bulletSpeed;
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 4, () => { this.fire(this.gameState.bigBullets); }, this);
    }
}

export default GreenTower;