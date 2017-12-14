import { IEnemyConfig } from "../enemies/IEnemyConfig";
import { Enemy } from "../enemies/Enemy";
import { TowerBullet } from "../bullets/TowerBullet";
import { ITowerBulletConfig } from "../bullets/ITowerBulletConfig";
import { ITowerConfig } from "../towers/ITowerConfig";
import { GameState } from "../states/GameState";
import { EnemyFactory } from "../enemies/EnemyFactory";

export class Configs {
    static level = 1;
    static money = 0;
    static score = 0;

    static HeadDoctor: IEnemyConfig = {
        spriteKey: "headDoctor",
        healthValue: 10,
        moneyValue: 3,
        scoreValue: 3,
        attackDamage: 5,
        movementSpeed: -25,
        deathSoundKey: "enemydeath",
        hitSoundKey: "enemyhit",
        specialAbility: {
            time: Phaser.Timer.SECOND * 0.5,
            ability: Configs.dodgeBullet
        }
    };

    static WomanDoctor: IEnemyConfig = {
        spriteKey: "enemyWomanDoctor",
        healthValue: 15,
        moneyValue: 4,
        scoreValue: 5,
        attackDamage: 5,
        movementSpeed: -20,
        deathSoundKey: "enemydeath",
        hitSoundKey: "enemyhit",
        specialAbility: {
            time: Phaser.Timer.SECOND * 3,
            ability: Configs.speedBoost
        }
    };

    static AfroDoctor: IEnemyConfig = {
        spriteKey: "afroDoctor",
        healthValue: 25,
        moneyValue: 4,
        scoreValue: 5,
        attackDamage: 5,
        movementSpeed: -20,
        deathSoundKey: "enemydeath",
        hitSoundKey: "enemyhit",
        specialAbility: {
            time: Phaser.Timer.SECOND * 3,
            ability: Configs.healthBoost
        }
    };

    static FlyingDoctor: IEnemyConfig = {
        spriteKey: "flyingDoctor",
        healthValue: 35,
        moneyValue: 4,
        scoreValue: 5,
        attackDamage: 5,
        movementSpeed: -18,
        deathSoundKey: "enemydeath",
        hitSoundKey: "enemyhit",
        specialAbility: {
            time: Phaser.Timer.SECOND * 3,
            ability: Configs.summonEnemy
        }
    };

    static SmallTowerBulletConfig: ITowerBulletConfig = {
        spriteKey: "smallbullet",
        fireSoundKey: "smallbulletfire",
        attackDamage: 5
    };

    static BigTowerBulletConfig: ITowerBulletConfig = {
        spriteKey: "bigbullet",
        fireSoundKey: "bigbulletfire",
        attackDamage: 7
    };

    static bullets: Array<ITowerBulletConfig> = [Configs.SmallTowerBulletConfig, Configs.BigTowerBulletConfig];

    static RedTowerState: ITowerConfig = {
        spriteKey: "redtower",
        healthVal: 10,
        price: 15,
        bulletSpeed: 200,
        fireTimes: [Phaser.Timer.SECOND * 4],
        deathSoundKey: "towerdeath",
        bulletConfig: Configs.BigTowerBulletConfig,
        barPosition: {
            x: 3,
            y: 7
        }
    };

    static GreenTowerState: ITowerConfig = {
        spriteKey: "greentower",
        healthVal: 10,
        price: 17,
        bulletSpeed: 200,
        fireTimes: [Phaser.Timer.SECOND * 4],
        deathSoundKey: "towerdeath",
        bulletConfig: Configs.BigTowerBulletConfig,
        barPosition: {
            x: 4,
            y: 7
        }
    };

    static SmallGreenTowerState: ITowerConfig = {
        spriteKey: "smallgreentower",
        healthVal: 10,
        price: 15,
        bulletSpeed: 200,
        fireTimes: [Phaser.Timer.SECOND * 3],
        deathSoundKey: "towerdeath",
        bulletConfig: Configs.SmallTowerBulletConfig,
        barPosition: {
            x: 5,
            y: 7
        }
    };

    static SmallYellowTowerState: ITowerConfig = {
        spriteKey: "smallyellowtower",
        healthVal: 10,
        price: 30,
        bulletSpeed: 200,
        deathSoundKey: "towerdeath",
        fireTimes: [Phaser.Timer.SECOND * 3, Phaser.Timer.SECOND * 3.5],
        bulletConfig: Configs.SmallTowerBulletConfig,
        barPosition: {
            x: 6,
            y: 7
        }
    };

    static towers: Array<ITowerConfig> = [Configs.RedTowerState, Configs.GreenTowerState,
    Configs.SmallGreenTowerState, Configs.SmallYellowTowerState];

    static resetStats(): void {
        Configs.level = 1;
        Configs.money = 0;
        Configs.score = 0;
        Configs.BigTowerBulletConfig.attackDamage = 7;
        Configs.SmallTowerBulletConfig.attackDamage = 5;
        Configs.RedTowerState.healthVal = 10;
        Configs.RedTowerState.bulletSpeed = 200;
        Configs.GreenTowerState.healthVal = 10;
        Configs.GreenTowerState.bulletSpeed = 200;
        Configs.SmallGreenTowerState.healthVal = 10;
        Configs.SmallGreenTowerState.bulletSpeed = 200;
        Configs.SmallYellowTowerState.healthVal = 10;
        Configs.SmallYellowTowerState.bulletSpeed = 200;
    }

    static dodgeBullet(enemy: Enemy): void {
        if (!enemy.dying && enemy.gameState.isSpriteOnScreen(enemy)) {
            enemy.gameState.bullets.forEachExists((towerBullet: TowerBullet) => {
                if (enemy.gameState.isOnSameRow(towerBullet.world.y, enemy.gameState.world.y, enemy.gameState.layer) &&
                    (enemy.x - towerBullet.x < 200)) {
                    let rand: number = Math.floor((Math.random() * 3) + 1);
                    if (rand === 2) {
                        let rand: number = Math.floor((Math.random() * 1) + 0);
                        if (rand === 0) {
                            enemy.gameState.moveSpriteDownRow(enemy);
                            enemy.game.add.tween(enemy).to({ alpha: 0 }, 200, "Linear", true, 0, 3, true);
                            return;
                        } else {
                            enemy.gameState.moveSpriteUpRow(enemy);
                            enemy.game.add.tween(enemy).to({ alpha: 0 }, 200, "Linear", true, 0, 3, true);
                            return;
                        }
                    }
                }
            });
        }
    }

    static summonEnemy(enemy: Enemy): void {
        if (enemy.gameState.isSpriteOnScreen(enemy)) {
            let rand: number = Math.floor((Math.random() * 5) + 1);
            if (rand === 2) {
                let enemyFactory: EnemyFactory = new EnemyFactory(enemy.gameState, enemy.gameState.enemies);
                enemyFactory.generateRandomWeakEnemy(enemy.y, enemy.x - 80);
                enemy.game.add.tween(enemy).to({ alpha: 0 }, 200, "Linear", true, 0, 3, true);
            }
        }
    }

    static speedBoost(enemy: Enemy): void {
        if (!enemy.dying && enemy.gameState.isSpriteOnScreen(enemy)) {
            let rand: number = Math.floor((Math.random() * 5) + 1);
            if (rand === 2) {
                enemy.movementSpeed -= 5;
                enemy.game.add.tween(enemy).to({ alpha: 0 }, 200, "Linear", true, 0, 3, true);
            }
        }
    }

    static healthBoost(enemy: Enemy): void {
        if (!enemy.dying && enemy.gameState.isSpriteOnScreen(enemy)) {
            let rand: number = Math.floor((Math.random() * 5) + 1);
            if (rand === 2) {
                enemy.healthValue += 5;
                enemy.game.add.tween(enemy).to({ alpha: 0 }, 200, "Linear", true, 0, 3, true);
            }
        }
    }
}

export default Configs;