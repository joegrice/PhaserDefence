class GameMain extends Phaser.Game {

    constructor() {
        let widthTiles: number = 12;
        let heightTiles: number = 8;
        let tileSize: number = 64;
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
    var game: GameMain = new GameMain();
};