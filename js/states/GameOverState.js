class GameOverState extends Phaser.State {
    constructor() {
        super();
    }
    create() {
        this.highscores = JSON.parse(this.game.cache.getText("highscores"));
        let score = new Score();
        score.name = "DSDSDSDSDSD";
        score.score = 99999;
        this.updateHighScore(score);
        this.saveFile();
        var titleText = this.game.add.text(this.game.width / 2, 80, "GAME OVER", { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;
        var playText = this.game.add.text(this.game.width / 2, 450, "Press \"Enter\" to return", { font: "20px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;
        var playText2 = this.game.add.text(this.game.width / 2, 500, "to the main menu.", { font: "20px Arial", fill: "#ffffff" });
        playText2.anchor.x = Math.round(playText2.width * 0.5) / playText2.width;
        let pkey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pkey.onDown.addOnce(this.start, this);
    }
    saveFile() {
        var blob = new Blob([this.highscores], { type: "text/plain;charset=utf-8" });
        console.log(this.highscores);
        saveAs(blob, "scores.json");
    }
    createScoreArray() {
        let scores = new Array();
        this.highscores.scores.forEach(score => {
            let newScore = new Score();
            newScore.name = score.name;
            newScore.score = score.score;
            scores.push(newScore);
        });
        return scores;
    }
    updateHighScore(playerScore) {
        let arr = this.createScoreArray();
        // let arr: Score[] = Object.keys(this.scores).map((name, score) => [name, score]);
        let sortedScores = this.highscores.scores.sort((a, b) => {
            return a.score - b.score;
        });
        this.highscores.scores.forEach((highScore) => {
            if (playerScore.score > highScore.score) {
                highScore = playerScore;
                return;
            }
        });
    }
    start() {
        this.game.state.start("BootState", true, true);
    }
}
//# sourceMappingURL=GameOverState.js.map