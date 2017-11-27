class ShopState extends Phaser.State {
    constructor() {
        super();
    }

    create() {
        let towers = [
            { name: "redtower", type: RedTowerStats },
            { name: "greentower", type: GreenTowerStats },
            { name: "smallgreentower", type: SmallGreenTowerStats },
            { name: "smallyellowtower", type: SmallYellowTowerStats }
        ];

        var titleText = this.game.add.text(this.game.world.centerX, 80, "UPGRADE BULLET SPEED", { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var moneyText = this.game.add.text(this.game.world.centerX, 150, "Money: " + GameStats.money,
            { font: "25px Arial", fill: "#ffffff" });
        moneyText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var errorText = this.game.add.text(50, 435, "Error: Not enough money.", { font: "25px Arial", fill: "#ffffff" });
        errorText.visible = false;

        for (let i = 0; i < towers.length; i++) {
            let btn = this.setUpShopItem((i + 1) * 150, towers[i].name);
            btn.events.onInputDown.add(() => {
                if (GameStats.money >= 50) {
                    towers[i].type.bulletSpeed += 50;
                    GameStats.money -= 50;
                    moneyText.text = "Money: " + GameStats.money;
                } else {
                    errorText.text = "Error: Not enough money, item costs: 50";
                    errorText.visible = true;
                }
            }, this);
        }

        var returntogamebtn = this.game.add.sprite(600, 450, "returntogamebtn");
        returntogamebtn.anchor.set(0.5);
        returntogamebtn.inputEnabled = true;
        returntogamebtn.events.onInputDown.add(this.returnToGame, this);
    }

    setUpShopItem(xpos: number, itemId: string): Phaser.Sprite {
        var item1bg = this.game.add.sprite(xpos, this.game.world.centerY, "shopitembg");
        item1bg.anchor.set(0.5);
        var item1img = this.game.add.sprite(xpos, this.game.world.centerY, itemId);
        item1img.anchor.set(0.5);
        var item1buybtn = this.game.add.sprite(xpos, this.game.world.centerY + 100, "shopbuybtn");
        item1buybtn.anchor.set(0.5);
        item1buybtn.inputEnabled = true;
        return item1buybtn;
    }

    returnToGame() {
        GameStats.level++;
        this.game.state.start("GameState", true, false);
    }
}