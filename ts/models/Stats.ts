class Stats {
    static resetStats(): void {
        GameStats.level = 1;
        GameStats.money = 80;
        SmallTowerBulletStats.damage = 5;
        BigTowerBulletStats.damage = 7;
        RedTowerStats.healthVal = 10;
        RedTowerStats.bulletSpeed = 200;
        GreenTowerStats.healthVal = 10;
        GreenTowerStats.bulletSpeed = 200;
        SmallGreenTowerStats.healthVal = 10;
        SmallGreenTowerStats.bulletSpeed = 200;
        SmallYellowTowerStats.healthVal = 10;
        SmallYellowTowerStats.bulletSpeed = 200;
    }
}
class GameStats {
    static level = 1;
    static money = 80;
}
class SmallTowerBulletStats {
    static damage = 5;
}
class BigTowerBulletStats {
    static damage = 7;
}
class RedTowerStats {
    static healthVal = 10;
    static bulletSpeed = 200;
}
class GreenTowerStats {
    static healthVal = 10;
    static bulletSpeed = 200;
}
class SmallGreenTowerStats {
    static healthVal = 10;
    static bulletSpeed = 200;
}
class SmallYellowTowerStats {
    static healthVal = 10;
    static bulletSpeed = 200;
}