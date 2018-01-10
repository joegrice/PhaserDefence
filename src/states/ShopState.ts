import Configs from "../configs/Configs";

export class ShopState extends Phaser.State {
    constructor() {
        super();
    }

    create(): void {
        var titleText: Phaser.Text = this.game.add.text(this.game.world.centerX, 80, "UPGRADE BULLET SPEED",
            { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var moneyText: Phaser.Text = this.game.add.text(this.game.world.centerX, 150, "Money: " + Configs.money,
            { font: "25px Arial", fill: "#ffffff" });
        moneyText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var infoText: Phaser.Text = this.game.add.text(50, 435, "Not enough money.", { font: "25px Arial", fill: "#ffffff" });
        infoText.visible = false;

        for (let i: number = 0; i < Configs.towers.length; i++) {
            let btn: Phaser.Sprite = this.setUpShopItem((i + 1) * 150, Configs.towers[i].spriteKey);
            let upgradeCost: number = 25;
            btn.events.onInputDown.add(() => {
                if (Configs.money >= upgradeCost) {
                    Configs.towers[i].bulletSpeed += 50;
                    Configs.money -= upgradeCost;
                    moneyText.text = "Money: " + Configs.money;
                } else {
                    infoText.text = "Not enough money, item costs: " + upgradeCost;
                    infoText.visible = true;
                }
            }, this);
        }

        var returntogamebtn: Phaser.Sprite = this.game.add.sprite(600, 450, "returntogamebtn");
        returntogamebtn.anchor.set(0.5);
        returntogamebtn.inputEnabled = true;
        returntogamebtn.events.onInputDown.add(this.returnToGame, this);
    }

    setUpShopItem(xpos: number, itemId: string): Phaser.Sprite {
        var itemBg: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY, "shopitembg");
        itemBg.anchor.set(0.5);
        var itemImg: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY, itemId);
        itemImg.anchor.set(0.5);
        var itemBuyBtn: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY + 100, "shopbuybtn");
        itemBuyBtn.anchor.set(0.5);
        itemBuyBtn.inputEnabled = true;
        return itemBuyBtn;
    }

    returnToGame(): void {
        this.game.state.start("GameState", true, false);
    }
}

export default ShopState;