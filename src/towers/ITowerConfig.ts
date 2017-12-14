import { Tower } from "./Tower";

export interface ITowerConfig {
    spriteKey: string;
    healthVal: number;
    price: number;
    bulletSpeed: number;
    fireTimes: number[];
    bulletKey: string;
    barPosition: {
        x: number;
        y: number;
    };
}

export default ITowerConfig;