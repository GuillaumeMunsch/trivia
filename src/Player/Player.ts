class Player {
  private purse: number = 0;

  constructor() {}

  earnCoin = () => ++this.purse;
}

export default Player;
