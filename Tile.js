/**
 * Tile for the background of the game board.
 */
class Tile {
  constructor(_x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;

    /** Width of the tile. */
    this.width = _width;
    /** Height of the tile. */
    this.height = _height;

    this.xRange = this.x + this.width;
    this.yRange = this.y + this.height;
  }
}
