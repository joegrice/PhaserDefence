class GlobalState {
    static resetStats() {
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
GlobalState.level = 1;
GlobalState.money = 0;
GlobalState.SmallTowerBulletState = {
    damage: 5
};
GlobalState.BigTowerBulletState = {
    damage: 7
};
GlobalState.RedTowerState = {
    key: "redtower",
    healthVal: 10,
    bulletSpeed: 200,
    type: RedTower
};
GlobalState.GreenTowerState = {
    key: "greentower",
    healthVal: 10,
    bulletSpeed: 200,
    type: GreenTower
};
GlobalState.SmallGreenTowerState = {
    key: "smallgreentower",
    healthVal: 10,
    bulletSpeed: 200,
    type: SmallGreenTower
};
GlobalState.SmallYellowTowerState = {
    key: "smallyellowtower",
    healthVal: 10,
    bulletSpeed: 200,
    type: SmallYellowTower
};
GlobalState.towers = [GlobalState.RedTowerState, GlobalState.GreenTowerState,
    GlobalState.SmallGreenTowerState, GlobalState.SmallYellowTowerState];
//# sourceMappingURL=GlobalState.js.map