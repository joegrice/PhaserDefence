import { Tower } from "./Tower";
import { ITowerBulletConfig } from "../bullets/ITowerBulletConfig";

export interface ITowerConfig {
    spriteKey: string;
    healthVal: number;
    price: number;
    bulletSpeed: number;
    fireTimes: number[];
    deathSoundKey: string;
    bulletConfig: ITowerBulletConfig;
    barPosition: {
        x: number;
        y: number;
    };
}

export default ITowerConfig;