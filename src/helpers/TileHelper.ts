import * as Phaser from "phaser-ce";
import { Layout, MapPosition } from "../models/Layout";
import { GameState } from "../states/GameState";

export class TileHelper {
    static onSameRow(y1: number, y2: number, layer: Phaser.TilemapLayer): boolean {
        let onSameRow: boolean = false;
        let towerY: number = layer.getTileY(y1);
        let enemyY: number = layer.getTileY(y2);
        if (towerY === enemyY) {
            onSameRow = true;
        }
        return onSameRow;
    }

    static isPositionForbidden(x: number, y: number, gameState: GameState): boolean {
        let isForbidden: boolean = false;
        let layout: Layout = JSON.parse(gameState.game.cache.getText("layout"));
        layout.forbiddenTiles.forEach((mapPos: MapPosition) => {
            if (x === mapPos.x && y === mapPos.y) {
                isForbidden = true;
            }
        });
        return isForbidden;
    }

    static getTileOnMap(x: number, y: number, layer: Phaser.TilemapLayer, map: Phaser.Tilemap): Phaser.Tile {
        var tileX: number = layer.getTileX(x);
        var tileY: number = layer.getTileY(y);
        return map.getTile(tileX, tileY, layer);
    }

    static moveSpriteDownRow(sprite: Phaser.Sprite, gameState: GameState): void {
        let spriteTile: Phaser.Tile = this.getTileOnMap(sprite.world.x, sprite.world.y, gameState.layer, gameState.map);
        if (!TileHelper.isPositionForbidden(spriteTile.x, spriteTile.y - 1, gameState)) {
            sprite.y -= 64;
        } else {
            this.moveSpriteUpRow(sprite, gameState);
        }
    }

    static moveSpriteUpRow(sprite: Phaser.Sprite, gameState: GameState): void {
        let spriteTile: Phaser.Tile = this.getTileOnMap(sprite.world.x, sprite.world.y, gameState.layer, gameState.map);
        if (!TileHelper.isPositionForbidden(spriteTile.x, spriteTile.y + 1, gameState)) {
            sprite.y += 64;
        } else {
            this.moveSpriteDownRow(sprite, gameState);
        }
    }
}

export default TileHelper;