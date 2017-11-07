module Models {
    export class SmallTowerBullet extends TowerBullet {
        /**
         *
         */
        constructor(game) {
            super(game);
            this.key = "smallbullet";
            this.loadTexture("smallbullet");
            this.exists = false;
        }
    }
}