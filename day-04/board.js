// board.js

module.exports = class Board {
  /**
   * Creates an empty game board, represented by an array
   */
  constructor() {
    this.board = [];
    this.numsCalled = [];
    this.winner = false;
    this.sums = {
      rows: [0,0,0,0,0], // top to bottom
      columns: [0,0,0,0,0], // left to right
      diagonals: [0,0] // 1st num is topLeft to bottomRight, 2nd is opposite
    };
  }

  /**
   * Adds a row to the board with the passed in values
   * @param {array} values What you would like to populate the row with
   */
  addRow(values) {
    this.board.push(values);
  }

  /**
   * When a new number is called, this checks the board and flags the number
   * as being called if it's on the board
   * @param {number} num the new number that was called
   */
  callNumber(num) {
    // Don't add any numbers after the board has won
    if (this.winner) return;
    // Don't count the same number twice
    if (this.numsCalled.includes(num)) return;
    // Add the new number to the numbers that have been called
    this.numsCalled.push(Number(num));
    // Check to see if the number's on the board
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == num) {
          this.sums.rows[i] += 1;
          this.sums.columns[j] += 1;
          if (i == j) this.sums.diagonals[0] += 1;
          if (i + j == 4) this.sums.diagonals[1] += 1;
        }
      }
    }
  }

  /**
   * Checks to see if the current board is a winner
   * @return {boolean} true if the board is a winner after calling this number
   */
  checkWinner() {
    const highestRow = Math.max(...this.sums.rows);
    const highestColumn = Math.max(...this.sums.columns);
    const highestDiag = Math.max(...this.sums.diagonals);
    this.winner = (highestRow == 5 || highestColumn == 5 || highestDiag == 5);
    return this.winner;
  }

  /**
   * First sums all of the winning numbers, then sums the total numbers and
   * returns the difference of the two
   * @returns The sum of the uncalled numbers
   */
  sumUncalled() {
    // Sum all of the called numbers (that are on the board)
    let sumCalled = 0;
    this.numsCalled.forEach(num => {
      this.board.forEach(row => {
        if (row.includes(num)) sumCalled += num;
      });
    });
    // Sum all of the numbers on the board
    let totalSum = 0;
    this.board.forEach(row => {
      totalSum += row.reduce((prev, curr) => prev + curr);
    });
    // Return the difference
    console.log(`totalSum: ${totalSum}, sumCalled: ${sumCalled}`);
    return totalSum - sumCalled;
  }
}