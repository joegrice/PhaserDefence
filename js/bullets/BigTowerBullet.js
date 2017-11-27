class BigTowerBullet extends TowerBullet {
    constructor(game) {
        super(game);
        this.key = "bigbullet";
        this.loadTexture("bigbullet");
        this.exists = false;
        this.attackDamage = BigTowerBulletStats.damage;
    }
}
//# sourceMappingURL=BigTowerBullet.js.map