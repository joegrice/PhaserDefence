import * as Phaser from "phaser-ce";
import { HighScores, Score } from "../models/HighScores";
import GlobalState from "../models/GlobalState";

export class GameOverState extends Phaser.State {

    highscores: HighScores;

    constructor() {
        super();
    }

    create(): void {
        this.stage.backgroundColor = "#000000";
        this.highscores = JSON.parse(this.game.cache.getText("highscores"));
        this.updateHighScore();

        var titleText: Phaser.Text = this.game.add.text(this.game.world.centerX, 80, "GAME OVER", { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        let highScoreXpos: number = 150;
        this.highscores.scores.forEach(score => {
            var scoreText: Phaser.Text = this.game.add.text(this.game.world.centerX, highScoreXpos,
                "Name: " + score.name + " Score: " + score.score, { font: "20px Arial", fill: "#ffffff" });
            scoreText.anchor.x = Math.round(scoreText.width * 0.5) / scoreText.width;
            highScoreXpos += 25;
        });

        var returnToGameBtn: Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, 400, "returntogamebtn");
        returnToGameBtn.anchor.set(0.5);
        returnToGameBtn.inputEnabled = true;
        returnToGameBtn.events.onInputDown.add(this.start, this);
    }

    updateHighScore(): void {
        let sortedScores: Score[] = this.highscores.scores.sort((a: Score, b: Score) => {
            return b.score - a.score;
        });

        for(let i: number = 0; i < this.highscores.scores.length; i++) {
            if (GlobalState.score > this.highscores.scores[i].score) {
                let name: string = prompt("Whats your name?");
                this.highscores.scores[i].name = name;
                this.highscores.scores[i].score = GlobalState.score;
                return;
            }
        }
    }

    start(): void {
        this.game.state.start("BootState", true, true);
    }
}

export default GameOverState;