import * as Phaser from "phaser-ce";
import Tower from "./Tower";
import GlobalState from "../models/GlobalState";
import GameState from "../states/GameState";

export class SmallYellowTower extends Tower {

    constructor(gameState: GameState, x: number, y: number) {
        super(gameState, x, y);
        this.key = "smallyellowtower";
        this.loadTexture("smallyellowtower");

        this.price = 20;
        this.healthVal = GlobalState.SmallYellowTowerState.healthVal;
        this.bulletSpeed = GlobalState.SmallYellowTowerState.bulletSpeed;
    }

    addFireEvent(): void {
        this.fireTimer.loop(Phaser.Timer.SECOND * 3, () => { this.fire(this.gameState.smallBullets); }, this);
        this.fireTimer.loop(Phaser.Timer.SECOND * 3.5, () => { this.fire(this.gameState.smallBullets); }, this);
    }
}

export default SmallYellowTower;