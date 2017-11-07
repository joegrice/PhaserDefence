module Enemy {
    export class Enemy extends Phaser.Sprite {
        /**
         *  Enemy interface
         */

        dying: boolean;
        moneyValue: number;
        healthVal: number;

        constructor(game) {
            super(game, 0, 0);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this);
            this.body.setSize(64, 64);            
            this.dying = false;
            this.healthVal = 10;
            this.moneyValue = 10;
        }

        stdReset(x, y) {
            this.reset(x, y);
            this.dying = false;
        }

        death() {
            this.kill();
        }
    }
}