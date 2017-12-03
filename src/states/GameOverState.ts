import * as Phaser from "phaser-ce";
import { HighScores, Score } from "../models/HighScores";
import GlobalState from "../models/GlobalState";

export class GameOverState extends Phaser.State {

    highscores: HighScores;

    constructor() {
        super();
    }

    create(): void {
        this.highscores = JSON.parse(this.game.cache.getText("highscores"));
        this.updateHighScore();

        var titleText: Phaser.Text = this.game.add.text(this.game.width / 2, 80, "GAME OVER", { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        let highScoreXpos: number = 150;
        this.highscores.scores.forEach(score => {
            var scoreText: Phaser.Text = this.game.add.text(this.game.width / 2, highScoreXpos,
                "Name: " + score.name + " Score: " + score.score, { font: "20px Arial", fill: "#ffffff" });
            scoreText.anchor.x = Math.round(scoreText.width * 0.5) / scoreText.width;
            highScoreXpos += 25;
        });

        var playText: Phaser.Text = this.game.add.text(this.game.width / 2, 400, "Press \"Enter\" to return",
            { font: "20px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;

        var playText2: Phaser.Text = this.game.add.text(this.game.width / 2, 425, "to the main menu.",
            { font: "20px Arial", fill: "#ffffff" });
        playText2.anchor.x = Math.round(playText2.width * 0.5) / playText2.width;

        let pkey: Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pkey.onDown.addOnce(this.start, this);
    }

    /*createScoreArray(): Score[] {
        let scores: Score[] = new Array<Score>();
        this.highscores.scores.forEach(score => {
            let newScore: Score = new Score();
            newScore.name = score.name;
            newScore.score = score.score;
            scores.push(newScore);
        });
        return scores;
    }*/

    updateHighScore(): void {
        // let arr: Score[] = this.createScoreArray();
        // let arr: Score[] = Object.keys(this.scores).map((name, score) => [name, score]);
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