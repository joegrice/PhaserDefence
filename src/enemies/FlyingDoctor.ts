import * as Phaser from "phaser-ce";
import Enemy from "./Enemy";
import GameState from "../states/GameState";
import TowerBullet from "../bullets/TowerBullet";
import { TileHelper } from "../helpers/TileHelper";

export class FlyingDoctor extends Enemy {

    constructor(gameState: GameState) {
        super(gameState);
        this.key = "flyingDoctor";
        this.loadTexture("flyingDoctor");
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.animations.add("walk");
        this.animations.play("walk", 20, true);
        this.healthValue = 30;
        this.moneyValue = 4;
        this.scoreValue = 5;
        this.movementSpeed = -25;
    }
}

export default FlyingDoctor;