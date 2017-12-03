import Tower from "../towers/Tower";

export interface ITowerState {
    key: string;
    healthVal: number;
    bulletSpeed: number;
    type: typeof Tower;
}

export default ITowerState;