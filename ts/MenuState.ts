module Game {
    export class MenuState extends Phaser.State {
        constructor() {
            super();
        }

        create() {
            var titleText = this.game.add.text(this.game.width / 2, 80, "Phaser Defence", {font: "50px Arial", fill: "#ffffff"});
            titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

            var playText = this.game.add.text(this.game.width / 2, 250, "Press \"Enter\" to play.", {font: "50px Arial", fill: "#ffffff"});
            playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;

            let pkey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            pkey.onDown.addOnce(this.start, this);
        }
        
        start() {
            this.game.state.start('GameRunningState')
        }
    }
}