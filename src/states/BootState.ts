import * as Phaser from "phaser-ce";

export class BootState extends Phaser.State {
    constructor() {
        super();
    }

    preload(): void {
        this.game.load.image("playgamebtn", "assets/playgamebtn.png");
    }

    create(): void {
        var titleText: Phaser.Text = this.game.add.text(this.game.world.centerX, 80, "Phaser Defence",
            { font: "50px Arial", fill: "#ffffff" });
        titleText.anchor.x = Math.round(titleText.width * 0.5) / titleText.width;

        var playGameBtn: Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, 250, "playgamebtn");
        playGameBtn.anchor.set(0.5);
        playGameBtn.inputEnabled = true;
        playGameBtn.events.onInputDown.add(this.start, this);
    }

    start(): void {
        this.game.state.start("PreloadState");
    }
}

export default BootState;