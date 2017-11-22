module Models {
    export class Layout {
        towerBar: TowerSetup[];
    }

    export class TowerSetup {
        name: string;
        position: TowerPosition;
    }

    export class TowerPosition {
        x: number;
        y: number;
    }
}