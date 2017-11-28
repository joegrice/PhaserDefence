class BigTowerBullet extends TowerBullet {

    constructor(game: Phaser.Game) {
        super(game);
        this.key = "bigbullet";
        this.loadTexture("bigbullet");
        this.exists = false;
        this.attackDamage = GlobalState.BigTowerBulletState.damage;
    }
}