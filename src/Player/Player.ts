import { Category } from "..";
import AllQuestionsSet from "../AllQuestionsSet/AllQuestionsSet";
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

  private askQuestion(questionsSet: AllQuestionsSet): void {
    const currentCategory = this.currentCategory();
    console.log(`Asking question: ${questionsSet.getNextQuestion(currentCategory)}`);
  }

  private currentCategory(): Category {
    const categories: Category[] = ["Pop", "Science", "Sports", "Rock"];
    const currentCategory = categories[this.place % 4];
    return currentCategory;
  }

  private move = (rollValue: number) => {
    this.place = Board.move({ from: this.place, value: rollValue });
    console.log(`He moves to place ${this.place}`);

    this.isGettingOutOfPenalityBox = rollValue % 2 != 0;

    return this.place;
  };

  roll = ({ questionsSet, rollValue }: { rollValue: number; questionsSet: AllQuestionsSet }) => {
    console.log(`Player ${this.name} rolled ${rollValue}`);

    if (this.isInPenalityBox) {
      console.log(`While in penalityBox`);

      if (rollValue % 2 != 0) {
        console.log(`He rolled an odd number`);
        this.isGettingOutOfPenalityBox = true;
        if (this.isGettingOutOfPenalityBox === true) console.log(`He might get out of penality box`);

        this.move(rollValue);

        this.askQuestion(questionsSet);
      } else {
        console.log(`He won't get out of penality box`);
        this.isGettingOutOfPenalityBox = false;
      }
    } else {
      console.log(`While not being in penalityBox`);
      this.move(rollValue);

      this.askQuestion(questionsSet);
    }
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
