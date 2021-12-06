// board.js

module.exports = class Board {
  /**
   * Creates a Board object with a 2D board of the given dimensions,
   * pre-filled in with 0's
   * @param {number} y The board width
   * @param {number} x The board height
   */
  constructor(y, x) {
    this.board = [];
    this.overTwoCoords = [];
    for (let i = 0; i <= x; i++) {
      const newRow = new Array(y+1).fill(0);
      this.board.push(newRow);
    }
  }

  /**
   * Marks a line on the board using the given starting and ending coordinates
   * @param {array<number>} start A tuple of the x1 y1 starting coordinates
   * @param {array<number>} end A tuple of the x2 y2 ending coordinates
   */
  addLine(start, end) {
    // Make both inputs strings
    start = [Number(start[0]), Number(start[1])];
    end = [Number(end[0]), Number(end[1])];
    // A j incrementer for non-vertical lines
    let j = start[1];
    // Whether to increment in the positive or negative direction
    let incrementX = start[0] < end[0] ? 1 : -1;
    let incrementY = start[1] < end[1] ? 1 : -1;
    for (let i = start[0]; i != end[0] + incrementX; i += incrementX) {
      // Mark it on the board
      this.board[j][i] += 1;
      // Mark it as equal to 2 if it is
      if (this.board[j][i] == 2) this.overTwoCoords.push([j,i]);
      // Increase j if needed
      if (end[1] != j) j += incrementY;
      // Run a for loop on the Y direction if the line is vertical
      if (start[0] == end[0] && i != end[0] + incrementX) {
        for (let k = j; k != end[1] + incrementY; k += incrementY) {
          this.board[k][i] += 1;
          // Mark it as equal to 2 if it is
          if (this.board[k][i] == 2) this.overTwoCoords.push([j,i]);
        }
      }
    }
  }

  /**
   * Useful for testing purposes, prints out a 2D array in a neat manner
   */
  prettyPrintBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == 0) {
          process.stdout.write('.');
        } else {
          process.stdout.write('' + this.board[i][j]);
        }
      }
      process.stdout.write('\n');
    }
  }
}