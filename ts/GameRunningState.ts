module Game {
    export class GameRunningState extends Phaser.State {
        constructor() {
            super();
        }
        game: Phaser.Game;
        map: Phaser.Tilemap;
        marker: Phaser.Graphics;
        cursors: Phaser.CursorKeys;
        layer: Phaser.TilemapLayer;
        wallLayer: Phaser.TilemapLayer;
        towers: Phaser.Group;
        bullets: Phaser.Group;
        weapon: Phaser.Weapon;
        towerList: Array<Models.Tower>;
        enemiesGroup: Phaser.Group;
        bulletTime: number;
        money: number;
        moneyText: Phaser.Text;

        preload() {
            this.game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image("tile2map64", "assets/tile2map64.png");
            this.game.load.image("towerDefense_tilesheet", "assets/towerDefense_tilesheet.png");
            this.game.load.image("tower", "assets/tower.png");
            this.game.load.image("bullet", "assets/bullet.png");
            this.game.load.atlasJSONHash("enemy1", "assets/enemy1.png", "assets/enemy1.json");
        }

        create() {
            this.map = this.game.add.tilemap("map", 64, 64, 15, 10);
            this.map.addTilesetImage("tile2map64", "tile2map64");
            this.map.addTilesetImage("towerDefense_tilesheet", "towerDefense_tilesheet");
            this.layer = this.map.createLayer("Tile Layer 1");
            this.wallLayer = this.map.createLayer("wall");
            this.layer.resizeWorld();

            this.money = 0;
            this.moneyText = this.game.add.text(32, 24, "Money: " + this.money);
            this.moneyText.fontSize = 16;

            this.towerList = new Array<Models.Tower>();
            this.towers = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "towers");
            //this.towers = this.game.add.group(Phaser.Physics.ARCADE, "towers", true, true);
            this.bullets = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "bullets");            

            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0xffffff, 1);
            this.marker.drawRect(0, 0, 64, 64);

            // Enemeies
            this.enemiesGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, "enemies");
            
            /*this.enemiesGroup = this.game.add.group();
            this.enemiesGroup.type = Phaser.SPRITE;
            this.enemiesGroup.enableBody = true;
            this.enemiesGroup.physicsBodyType = Phaser.Physics.ARCADE;*/

            this.createDoctors();

            /*this.enemiesGroup = this.game.add.group();
            for(let i = 0; i < 10; i++) {
                this.enemiesGroup.add(new Enemy.Doctor(this.game));
            }
            let doc = this.enemiesGroup.getFirstExists(false);
            doc.spawn(11 * 64, 1 * 64)
            doc = this.enemiesGroup.getFirstExists(false);
            doc.spawn(11 * 64, 2 * 64) */           

            this.game.input.addMoveCallback((pointer: Phaser.Pointer, x: number, y: number) => {
                this.marker.x = this.layer.getTileX(x) * 64;
                this.marker.y = this.layer.getTileY(y) * 64;
            }, this);

            this.game.input.onDown.add(() => {
                this.addTowerToTile();
            }, this);

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        createDoctors() {
            for (let y = 1; y < 7; y++) {
                let rand = Math.floor((Math.random() * 5) + 1);
                for (let z = 0; z < rand; z++) {
                    this.enemiesGroup.add(new Enemy.Doctor(this.game));
                    let doc = this.enemiesGroup.getFirstExists(false);
                    doc.spawn((11 * 64) + z * 125, y * 64)                   
                    /*let doctor = this.enemiesGroup.create((11 * 64) + z * 125, y * 64, "enemy1");
                    doctor.anchor.setTo(0.5, 0.5);
                    doctor.animations.add('walk');
                    doctor.animations.play('walk', 15, true);
                    doctor.body.velocity.x = -10;*/
                }
            }
        }

        addTowerToTile() {
            var x = this.layer.getTileX(this.game.input.activePointer.worldX) * 64;
            var y = this.layer.getTileX(this.game.input.activePointer.worldY) * 64;
            //console.log(`X= ${x / 64} Y= ${y / 64}`);
            var tile = this.map.getTile(x, y, this.layer);
            let towerOnTile = this.towerOnTile(x, y);
            if (!towerOnTile) {
                this.towerList.push(new Models.Tower(this.game, x, y, this.towers, this.bullets));
            }
        }

        towerOnTile(x: number, y: number) {
            let towerOnTile = false;
            if (this.towerList != null && this.towerList.length > 0) {
                for (let i = 0; i < this.towerList.length; i++) {
                    if (this.towerList[i].xPos === x && this.towerList[i].yPos === y) {
                        towerOnTile = true;
                        break;
                    }
                }
            }
            return towerOnTile;
        }

        update() {
            for (var i = 0; i < this.towerList.length; i++) {
                this.towerList[i].sprite.body.velocity.x = 0;
                this.towerList[i].shoot();
                //this.game.physics.arcade.overlap(this.towerList[i].weapon.bullets, this.enemiesGroup, this.collisionHandler, null, this);
            }
            this.game.physics.arcade.overlap(this.bullets, this.enemiesGroup, this.collisionHandler, null, this);            
        }

        collisionHandler(bullet, enemy) {
            // Check enemy and bullet are on the same Y axis
            let bullety = this.layer.getTileX(bullet.world.y);
            let enemyy = this.layer.getTileX(enemy.world.y);
            if (bullety === enemyy) {
                enemy.hit(bullet);
                this.updateMoney(enemy.moneyValue);
            }
        }

        updateMoney(amount: number) {
            this.money += amount;
            this.moneyText.text = "Money: " + this.money;
        }

        render() {
        }
    }
}