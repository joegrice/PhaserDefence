import { Enemy } from "./Enemy";

export interface IEnemyConfig {
    spriteKey: string;
    healthValue: number;
    moneyValue: number;
    scoreValue: number;
    attackDamage: number;
    movementSpeed: number;
    specialAbility?: {
        time: number;
        ability(enemy: Enemy): void;
    };
}