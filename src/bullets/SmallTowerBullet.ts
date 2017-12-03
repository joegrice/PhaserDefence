import TowerBullet from "./TowerBullet";
import GlobalState from "../models/GlobalState";

export class SmallTowerBullet extends TowerBullet {

    constructor(game: Phaser.Game) {
        super(game);
        this.key = "smallbullet";
        this.loadTexture("smallbullet");
        this.exists = false;

        this.attackDamage = GlobalState.SmallTowerBulletState.damage;
    }
}

export default SmallTowerBullet;