class ShopState extends Phaser.State {
    constructor() {
        super();
    }
    create() {
        var titleText = this.game.add.text(this.game.world.centerX, 80, "UPGRADE BULLET SPEED", { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;
        var moneyText = this.game.add.text(this.game.world.centerX, 150, "Money: " + GlobalState.money, { font: "25px Arial", fill: "#ffffff" });
        moneyText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;
        var errorText = this.game.add.text(50, 435, "Error: Not enough money.", { font: "25px Arial", fill: "#ffffff" });
        errorText.visible = false;
        for (let i = 0; i < GlobalState.towers.length; i++) {
            let btn = this.setUpShopItem((i + 1) * 150, GlobalState.towers[i].key);
            btn.events.onInputDown.add(() => {
                if (GlobalState.money >= 25) {
                    GlobalState.towers[i].bulletSpeed += 50;
                    GlobalState.money -= 25;
                    moneyText.text = "Money: " + GlobalState.money;
                }
                else {
                    errorText.text = "Error: Not enough money, item costs: 25";
                    errorText.visible = true;
                }
            }, this);
        }
        var returntogamebtn = this.game.add.sprite(600, 450, "returntogamebtn");
        returntogamebtn.anchor.set(0.5);
        returntogamebtn.inputEnabled = true;
        returntogamebtn.events.onInputDown.add(this.returnToGame, this);
    }
    setUpShopItem(xpos, itemId) {
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
        GlobalState.level++;
        this.game.state.start("GameState", true, false);
    }
}
//# sourceMappingURL=ShopState.js.map