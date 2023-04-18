import Player from "../Player/Player";

class AllPlayersSet {
  private playersSet: Player[] = [];
  private currentPlayerIndex = 0;

  getCurrentPlayer = () => this.playersSet[this.currentPlayerIndex];

  addPlayer = (player: Player) => {
    this.playersSet = [...this.playersSet, player];
    console.log(`Number of players: ${this.playersSet.length}`);
  };

  switchPlayer = () => {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersSet.length;
  };
}

export default AllPlayersSet;
