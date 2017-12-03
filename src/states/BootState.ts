export class BootState extends Phaser.State {
    constructor() {
        super();
    }

    create(): void {
        var titleText: Phaser.Text = this.game.add.text(this.game.width / 2, 80, "Phaser Defence",
            { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var playText: Phaser.Text = this.game.add.text(this.game.width / 2, 250, "Press \"Enter\" to play.",
            { font: "50px Arial", fill: "#ffffff" });
        playText.anchor.x = Math.round(playText.width * 0.5) / playText.width;

        let pkey: Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pkey.onDown.addOnce(this.start, this);
    }

    start(): void {
        this.game.state.start("PreloadState");
    }
}

export default BootState;