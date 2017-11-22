module Game {
    export class GameMain {
        game : Phaser.Game;
        
        constructor() {
            let widthTiles = 12;
            let heightTiles = 8;
            let tileSize = 64;
            this.game = new Phaser.Game(widthTiles * tileSize, heightTiles * tileSize, Phaser.AUTO, 'content');

            this.game.state.add("BootState", Game.BootState, false);
            this.game.state.add("PreloadState", Game.PreloadState, false);
            this.game.state.add("GameState", Game.GameState, false);
            this.game.state.add("GameOverState", Game.GameOverState, false);
            this.game.state.start("BootState");
        }
    }
}

window.onload = () => {
    var game = new Game.GameMain();
}