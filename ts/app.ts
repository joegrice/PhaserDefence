module Game {
    export class GameMain {
        game : Phaser.Game;
        
        constructor() {
            this.game = new Phaser.Game(960, 640, Phaser.AUTO, 'content');

            this.game.state.add("GameRunningState", Game.GameRunningState, false);
            this.game.state.start("GameRunningState");
        }
    }
}

window.onload = () => {
    var game = new Game.GameMain();
}