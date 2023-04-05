import Board from "../Board/Board";

class Player {
  private purse: number = 0;
  private place: number = 0;
  private isInPenalityBox = false;
  private isGettingOutOfPenalityBox;

  constructor() {}

  getIsInPenalityBox = () => this.isInPenalityBox;
  getIsGettingOutOfPenalityBox = () => this.isGettingOutOfPenalityBox;

  earnCoin = () => ++this.purse;

  roll = (rollValue: number) => {
    this.place = Board.move({ from: this.place, value: rollValue });
    this.isGettingOutOfPenalityBox = rollValue % 2 != 0;
    return this.place;
  };

  didWinTheGame = () => this.purse === 6;

  providesWrongAnswer = () => {
    this.isInPenalityBox = true;
  };

  providesCorrectAnswer = () => {
    this.earnCoin();
    this.isInPenalityBox = false;
  };

  expectToBeInPenalityBox = (expect: jest.Expect) => (isInPenalityBox: boolean) =>
    expect(this.isInPenalityBox).toEqual(isInPenalityBox);

  expectToBeAllowedOfOrPenalityBox = (expect: jest.Expect) => (isGettingOutOfPenalityBox: boolean) =>
    expect(this.isGettingOutOfPenalityBox).toEqual(isGettingOutOfPenalityBox);
}

export default Player;
