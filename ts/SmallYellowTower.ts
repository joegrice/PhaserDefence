module Models {
    export class SmallYellowTower extends Tower{
        
        constructor(game: Phaser.Game, x: number, y: number, bullets: Phaser.Group) {
            super(game, x, y, bullets);
            this.key = "smallyellowtower";
            this.loadTexture("smallyellowtower");

            let loop1 = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fire, this);  
            this.fireLoops.push(loop1);            
            let loop2 = this.game.time.events.loop(Phaser.Timer.SECOND * 3.5, this.fire, this);
            this.fireLoops.push(loop2);            
        }
    }
}