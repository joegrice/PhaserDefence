import * as Phaser from "phaser-ce";
import Enemy from "./Enemy";
import GameState from "../states/GameState";
import TowerBullet from "../bullets/TowerBullet";
import { TileHelper } from "../helpers/TileHelper";

export class WomanDoctor extends Enemy {

    constructor(gameState: GameState) {
        super(gameState);
        this.key = "enemyWomanDoctor";
        this.loadTexture("enemyWomanDoctor");
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.animations.add("walk");
        this.animations.play("walk", 20, true);
        this.healthValue = 15;
        this.scoreValue = 4;
        this.movementSpeed = -30;
    }
}

export default WomanDoctor;