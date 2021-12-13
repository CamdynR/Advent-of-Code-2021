// transparency.js

module.exports = class Transparency {
  /**
   * Creates a Transparency object with a filled in board of the given points
   * @param {array<object>} points the x & y coordinates of all of the initial
   *                               points
   */
  constructor(points) {
    // Grab the largest X and Y coordinates for the 2D array points
    this.width = Math.max(...points.map(point => point.x)) + 1;
    this.height = Math.max(...points.map(point => point.y)) + 1;
    this.sheet = [];
    // Fill in the sheet with blanks
    for (let i = 0; i < this.height; i++) {
      this.sheet.push(new Array(this.width).fill('.'));
    }
    // Add all of the given intial points
    for (let i = 0; i < points.length; i++) {
      this.addPoint(points[i].x, points[i].y);
    }
  }

  /**
   * Adds a point to the sheet
   * @param {number} x the x coordinate of the point to add
   * @param {number} y the y coordinate of the point to add
   */
  addPoint(x, y) {
    // don't add any points that are out of bounds
    if (x > this.width || y > this.height) return;
    // mark the point using the # symbol
    this.sheet[y][x] = '#';
    this.visibleDots += 1;
  }

  /**
   * "Folds" the sheet in the direction and index of the given direction
   * and index
   * @param {string} dir the direction of where to fold the sheet
   * @param {number} index the index of where to fold the sheet
   */
  foldSheet(dir, index) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.sheet[y][x] == '#') {
          if (dir == 'x' && x > index) this.sheet[y][index-(x-index)] = '#';
          if (dir == 'y' && y > index) this.sheet[index-(y-index)][x] = '#';
        }
      }
    }
    if (dir == 'x') this.sheet.map(row => row.splice(index));
    if (dir == 'y') this.sheet.splice(index);
    this.width = this.sheet[0].length;
    this.height = this.sheet.length;
  }

  /**
   * Counts how many dots are currently visible on the board
   * @returns {number} the number of visible dots
   */
  getVisibleDots() {
    let visibleDots = 0;
    this.sheet.forEach(row => {
      row.forEach(point => {
        if (point == '#') {
          visibleDots += 1
        }
      });
    });
    return visibleDots;
  }

  /**
   * Pretty prints the sheet to the console so it's easier to see
   * than a standard 2D array
   */
  printSheet() {
    let sheetStr = '';
    this.sheet.forEach(row => {
      row.forEach(point => {
        sheetStr += point;
      });
      sheetStr += '\n';
    });
    console.log(sheetStr);
  }
}