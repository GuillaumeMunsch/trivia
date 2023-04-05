import Board from "../Board/Board";

class Player {
  private purse: number = 0;
  private place: number = 0;
  private isInPenalityBox = false;
  private isGettingOutOfPenalityBox;

  constructor(private name: string) {
    console.log(`Adding player ${name} to the game`);
  }

  deprecatedGetIsInPenalityBox = () => this.isInPenalityBox;
  deprecatedGetIsGettingOutOfPenalityBox = () => this.isGettingOutOfPenalityBox;
  deprecatedGetName = () => this.name;
  deprecatedGetPlace = () => this.place;
  deprecatedGetScore = () => this.purse;

  earnCoin = () => ++this.purse;

  roll = (rollValue: number) => {
    this.place = Board.move({ from: this.place, value: rollValue });
    console.log(`He moves to place ${this.place}`);

    this.isGettingOutOfPenalityBox = rollValue % 2 != 0;
    return this.place;
  };

  didWinTheGame = () => {
    const didPlayerWin = this.purse === 6;
    console.log(`Player ${this.name} did${didPlayerWin ? "" : " not"} win`);

    return didPlayerWin;
  };

  providesWrongAnswer = () => {
    console.log(`Player ${this.name} answered wrongly`);

    this.isInPenalityBox = true;
    console.log(`He is put in penality box`);
  };

  providesCorrectAnswer = () => {
    this.isInPenalityBox = false;
    this.earnCoin();
  };

  expectToBeInPenalityBox = (expect: jest.Expect) => (isInPenalityBox: boolean) =>
    expect(this.isInPenalityBox).toEqual(isInPenalityBox);

  expectToBeAllowedOfOrPenalityBox = (expect: jest.Expect) => (isGettingOutOfPenalityBox: boolean) =>
    expect(this.isGettingOutOfPenalityBox).toEqual(isGettingOutOfPenalityBox);
}

export default Player;
