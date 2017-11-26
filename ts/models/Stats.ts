module Models {
    export class Stats {
        static resetStats() {
            Models.GameStats.level = 1;
            Models.GameStats.money = 0;
            Models.SmallTowerBulletStats.damage = 5;
            Models.BigTowerBulletStats.damage = 7;
            Models.RedTowerStats.healthVal = 10;
            Models.RedTowerStats.bulletSpeed = 200;
            Models.GreenTowerStats.healthVal = 10;
            Models.GreenTowerStats.bulletSpeed = 200;
            Models.SmallGreenTowerStats.healthVal = 10;
            Models.SmallGreenTowerStats.bulletSpeed = 200;
            Models.SmallYellowTowerStats.healthVal = 10;
            Models.SmallYellowTowerStats.bulletSpeed = 200;
        }
    }
    export class GameStats {
        static level = 1;
        static money = 0;
    }
    export class SmallTowerBulletStats {
        static damage = 5;
    }
    export class BigTowerBulletStats {
        static damage = 7;
    }
    export class RedTowerStats {
        static healthVal = 10;
        static bulletSpeed = 200;
    }
    export class GreenTowerStats {
        static healthVal = 10;
        static bulletSpeed = 200;
    }
    export class SmallGreenTowerStats {
        static healthVal = 10;
        static bulletSpeed = 200;
    }
    export class SmallYellowTowerStats {
        static healthVal = 10;
        static bulletSpeed = 200;
    }
}