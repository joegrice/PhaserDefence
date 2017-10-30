var Game;
(function (Game) {
    var GameMain = /** @class */ (function () {
        function GameMain() {
            this.game = new Phaser.Game(960, 640, Phaser.AUTO, 'content');
            this.game.state.add("GameRunningState", Game.GameRunningState, false);
            this.game.state.start("GameRunningState");
        }
        return GameMain;
    }());
    Game.GameMain = GameMain;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.GameMain();
};
//# sourceMappingURL=app.js.map