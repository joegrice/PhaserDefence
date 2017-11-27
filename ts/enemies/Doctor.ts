class Doctor extends Enemy {

    constructor(game: Phaser.Game) {
        super(game);
        this.key = "enemy1";
        this.loadTexture("enemy1");
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.animations.add("walk");
        this.animations.play("walk", 20, true);
        this.healthVal = 10;
    }

    spawn(x: number, y: number) {
        this.stdReset(x, y);
        this.body.velocity.x = -25;
    }
}