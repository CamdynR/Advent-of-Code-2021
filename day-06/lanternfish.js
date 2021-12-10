// lanternfish.js

module.exports = class Lanternfish {
  constructor(daysLeft) {
    this.daysUntilSpawn = daysLeft;
  }

  /**
   * Decreases the daysUntilSpawn timer by 1 day. Returns true if
   * there is a new spawn (and resets timer), otherwise false.
   * @returns {boolean} True if new spawn, false otherwise.
   */
  decreaseTimer() {
    this.daysUntilSpawn -= 1;
    const newSpawn = this.daysUntilSpawn == -1;
    if (newSpawn) {
      this.daysUntilSpawn = 6;
    }
    return newSpawn;
  }
}