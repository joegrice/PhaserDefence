class GameMain extends Phaser.Game {
    constructor() {
        let widthTiles = 12;
        let heightTiles = 8;
        let tileSize = 64;
        super(widthTiles * tileSize, heightTiles * tileSize, Phaser.AUTO, "content");
        this.state.add("BootState", BootState, false);
        this.state.add("PreloadState", PreloadState, false);
        this.state.add("GameState", GameState, false);
        this.state.add("ShopState", ShopState, false);
        this.state.add("GameOverState", GameOverState, false);
        this.state.start("BootState");
    }
}
window.onload = () => {
    var game = new GameMain();
};
//# sourceMappingURL=app.js.map