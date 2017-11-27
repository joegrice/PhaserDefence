class Layout {
    towerBar: TowerSetup[];
    forbiddenTiles: MapPosition[];
}

class TowerSetup {
    name: string;
    position: MapPosition;
}

class MapPosition {
    x: number;
    y: number;
}