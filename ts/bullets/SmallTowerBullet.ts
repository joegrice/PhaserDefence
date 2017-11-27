class SmallTowerBullet extends TowerBullet {

    constructor(game: Phaser.Game) {
        super(game);
        this.key = "smallbullet";
        this.loadTexture("smallbullet");
        this.exists = false;

        this.attackDamage = SmallTowerBulletStats.damage;
    }
}