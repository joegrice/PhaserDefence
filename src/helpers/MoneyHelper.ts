import * as Phaser from "phaser-ce";
import { GlobalState } from "../models/GlobalState";

export class MoneyHelper {
    static addMoney(amount: number, moneyText: Phaser.Text): void {
        GlobalState.money += amount;
        moneyText.text = "Money: " + GlobalState.money;
    }

    static subtractMoney(amount: number, moneyText: Phaser.Text): void {
        GlobalState.money -= amount;
        moneyText.text = "Money: " + GlobalState.money;
    }
}

export default MoneyHelper;