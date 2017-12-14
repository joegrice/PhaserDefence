import Configs from "../data/Configs";

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

        var errorText: Phaser.Text = this.game.add.text(50, 435, "Error: Not enough money.", { font: "25px Arial", fill: "#ffffff" });
        errorText.visible = false;

        for (let i: number = 0; i < Configs.towers.length; i++) {
            let btn: Phaser.Sprite = this.setUpShopItem((i + 1) * 150, Configs.towers[i].spriteKey);
            btn.events.onInputDown.add(() => {
                if (Configs.money >= 25) {
                    Configs.towers[i].bulletSpeed += 50;
                    Configs.money -= 25;
                    moneyText.text = "Money: " + Configs.money;
                } else {
                    errorText.text = "Error: Not enough money, item costs: 25";
                    errorText.visible = true;
                }
            }, this);
        }

        var returntogamebtn: Phaser.Sprite = this.game.add.sprite(600, 450, "returntogamebtn");
        returntogamebtn.anchor.set(0.5);
        returntogamebtn.inputEnabled = true;
        returntogamebtn.events.onInputDown.add(this.returnToGame, this);
    }

    setUpShopItem(xpos: number, itemId: string): Phaser.Sprite {
        var item1bg: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY, "shopitembg");
        item1bg.anchor.set(0.5);
        var item1img: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY, itemId);
        item1img.anchor.set(0.5);
        var item1buybtn: Phaser.Sprite = this.game.add.sprite(xpos, this.game.world.centerY + 100, "shopbuybtn");
        item1buybtn.anchor.set(0.5);
        item1buybtn.inputEnabled = true;
        return item1buybtn;
    }

    returnToGame(): void {
        Configs.level++;
        this.game.state.start("GameState", true, false);
    }
}

export default ShopState;