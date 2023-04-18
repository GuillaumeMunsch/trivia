import { Category } from "..";
import AllQuestionsSet from "../AllQuestionsSet/AllQuestionsSet";
import Board from "../Board/Board";

class Player {
  private purse: number = 0;
  private place: number = 0;
  private isInPenalityBox = false;
  private isGettingOutOfPenalityBox;

  constructor(private name: string) {}

  deprecatedGetIsInPenalityBox = () => this.isInPenalityBox;
  deprecatedGetIsGettingOutOfPenalityBox = () => this.isGettingOutOfPenalityBox;
  deprecatedGetName = () => this.name;
  deprecatedGetPlace = () => this.place;
  deprecatedGetScore = () => this.purse;

  earnCoin = () => ++this.purse;

  private askQuestion(questionsSet: AllQuestionsSet): void {
    const currentCategory = this.currentCategory();
  }

  private currentCategory(): Category {
    const categories: Category[] = ["Pop", "Science", "Sports", "Rock"];
    const currentCategory = categories[this.place % 4];
    return currentCategory;
  }

  private move = (rollValue: number) => {
    this.place = Board.move({ from: this.place, value: rollValue });

    this.isGettingOutOfPenalityBox = rollValue % 2 != 0;

    return this.place;
  };

  roll = ({ questionsSet, rollValue }: { rollValue: number; questionsSet: AllQuestionsSet }) => {
    if (this.isInPenalityBox) {
      if (rollValue % 2 != 0) {
        this.isGettingOutOfPenalityBox = true;

        this.move(rollValue);

        this.askQuestion(questionsSet);
      } else {
        this.isGettingOutOfPenalityBox = false;
      }
    } else {
      this.move(rollValue);

      this.askQuestion(questionsSet);
    }
    return this.place;
  };

  didWinTheGame = () => {
    const didPlayerWin = this.purse === 6;

    return didPlayerWin;
  };

  providesWrongAnswer = () => {
    this.isInPenalityBox = true;
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
