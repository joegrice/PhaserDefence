import TowerBullet from "./TowerBullet";
import GlobalState from "../models/GlobalState";

export class BigTowerBullet extends TowerBullet {

    constructor(game: Phaser.Game) {
        super(game);
        this.key = "bigbullet";
        this.loadTexture("bigbullet");
        this.exists = false;
        this.attackDamage = GlobalState.BigTowerBulletState.damage;
    }
}

export default BigTowerBullet;