module Game {
    export class GameMain {
        game : Phaser.Game;
        
        constructor() {
            let widthTiles = 12;
            let heightTiles = 8;
            let tileSize = 64;
            this.game = new Phaser.Game(widthTiles * tileSize, heightTiles * tileSize, Phaser.AUTO, 'content');

            this.game.state.add("MenuState", Game.MenuState, false);
            this.game.state.add("GameRunningState", Game.GameRunningState, false);
            this.game.state.start("MenuState");
        }
    }
}

window.onload = () => {
    var game = new Game.GameMain();
}