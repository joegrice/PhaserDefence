class GlobalState {
    static level = 1;
    static money = 0;

    static SmallTowerBulletState: ITowerBulletState = {
        damage: 5
    };

    static BigTowerBulletState: ITowerBulletState = {
        damage: 7
    };

    static RedTowerState: ITowerState = {
        key: "redtower",
        healthVal: 10,
        bulletSpeed: 200,
        type: RedTower
    };

    static GreenTowerState: ITowerState = {
        key: "greentower",
        healthVal: 10,
        bulletSpeed: 200,
        type: GreenTower
    };

    static SmallGreenTowerState: ITowerState = {
        key: "smallgreentower",
        healthVal: 10,
        bulletSpeed: 200,
        type: SmallGreenTower
    };

    static SmallYellowTowerState: ITowerState = {
        key: "smallyellowtower",
        healthVal: 10,
        bulletSpeed: 200,
        type: SmallYellowTower
    };

    static towers: Array<ITowerState> = [ GlobalState.RedTowerState, GlobalState.GreenTowerState,
        GlobalState.SmallGreenTowerState, GlobalState.SmallYellowTowerState ];

    static resetStats(): void {
        GlobalState.level = 1;
        GlobalState.money = 0;
        GlobalState.BigTowerBulletState.damage = 7;
        GlobalState.SmallTowerBulletState.damage = 5;
        GlobalState.RedTowerState.healthVal = 10;
        GlobalState.RedTowerState.bulletSpeed = 200;
        GlobalState.GreenTowerState.healthVal = 10;
        GlobalState.GreenTowerState.bulletSpeed = 200;
        GlobalState.SmallGreenTowerState.healthVal = 10;
        GlobalState.SmallGreenTowerState.bulletSpeed = 200;
        GlobalState.SmallYellowTowerState.healthVal = 10;
        GlobalState.SmallYellowTowerState.bulletSpeed = 200;
    }
}