module Models {
    export class BigTowerBullet extends TowerBullet {
        
        constructor(game) {
            super(game);
            this.key = "bigbullet";
            this.loadTexture("bigbullet");
            this.exists = false;
            this.attackDamage = Models.BigTowerBulletStats.damage;
        }
    }
}