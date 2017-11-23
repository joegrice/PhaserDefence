module Models {
    export class Layout {
        towerBar: TowerSetup[];
        forbiddenTiles: MapPosition[];
    }

    export class TowerSetup {
        name: string;
        position: MapPosition;
    }

    export class MapPosition {
        x: number;
        y: number;
    }
}