import * as Phaser from "phaser-ce";
import Enemy from "./Enemy";
import GameState from "../states/GameState";
import TowerBullet from "../bullets/TowerBullet";
import { TileHelper } from "../helpers/TileHelper";

export class HeadDoctor extends Enemy {

    constructor(gameState: GameState) {
        super(gameState);
        this.key = "headDoctor";
        this.loadTexture("headDoctor");
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.animations.add("walk");
        this.animations.play("walk", 20, true);
        this.healthValue = 10;
        this.movementSpeed = -30;

        this.eventTimer.loop(Phaser.Timer.SECOND * 0.5, () => { this.dodgeBullet(); }, this);
    }

    dodgeBullet(): void {
        if (!this.dying) {
            let inRange: Array<TowerBullet> = this.gameState.bigBullets.filter(bullet => bullet.exists).list
                .concat(this.gameState.smallBullets.filter(bullet => bullet.exists).list);
            inRange.forEach((towerBullet: TowerBullet) => {
                if (TileHelper.onSameRow(towerBullet.world.y, this.world.y, this.gameState.layer) &&
                    TileHelper.spriteOnScreen(this) && (this.x - towerBullet.x < 200)) {
                    let rand: number = Math.floor((Math.random() * 3) + 1);
                    if (rand === 2) {
                        this.moveDoctor();
                    }
                }
            });
        }
    }

    moveDoctor(): void {
        let rand: number = Math.floor((Math.random() * 1) + 0);
        if (rand === 0) {
            TileHelper.moveSpriteDownRow(this, this.gameState);
        } else {
            TileHelper.moveSpriteUpRow(this, this.gameState);
        }
    }
}

export default HeadDoctor;