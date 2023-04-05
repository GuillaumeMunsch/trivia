import AllQuestionsSet from "./AllQuestionsSet/AllQuestionsSet";
import Board from "./Board/Board";
import Player from "./Player/Player";

export type Category = "Pop" | "Science" | "Sports" | "Rock";

export class Game {
  private players: Array<Player> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;
  private questionsSet: AllQuestionsSet;

  constructor() {
    this.questionsSet = new AllQuestionsSet();
  }

  public add(name: string) {
    this.players.push(new Player(name));
    const numberOfPlayers = this.howManyPlayers();
  }

  private howManyPlayers(): number {
    console.log(`Number of players: ${this.players.length}`);
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(`Player ${this.players[this.currentPlayerIndex].deprecatedGetName()} rolled ${roll}`);

    if (this.players[this.currentPlayerIndex].deprecatedGetIsInPenalityBox()) {
      console.log(`While in penalityBox`);

      if (roll % 2 != 0) {
        console.log(`He rolled an odd number`);
        this.isGettingOutOfPenaltyBox = true;
        if (this.isGettingOutOfPenaltyBox === true) console.log(`He might get out of penality box`);

        this.players[this.currentPlayerIndex].roll(roll);

        this.askQuestion();
      } else {
        console.log(`He won't get out of penality box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      console.log(`While not being in penalityBox`);
      this.players[this.currentPlayerIndex].roll(roll);

      this.askQuestion();
    }
  }

  private askQuestion(): void {
    const currentCategory = this.currentCategory();
    console.log(`Asking question: ${this.questionsSet.getNextQuestion(currentCategory)}`);
  }

  private currentCategory(): Category {
    const categories: Category[] = ["Pop", "Science", "Sports", "Rock"];
    const currentCategory = categories[this.players[this.currentPlayerIndex].deprecatedGetPlace() % 4];
    return currentCategory;
  }

  public wrongAnswer(): boolean {
    this.players[this.currentPlayerIndex].providesWrongAnswer();

    this.currentPlayerIndex += 1;

    if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;
    console.log(`The current player is now ${this.players[this.currentPlayerIndex].deprecatedGetName()}`);

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.players[this.currentPlayerIndex].deprecatedGetName()} answered correctly`);

    if (this.players[this.currentPlayerIndex].deprecatedGetIsInPenalityBox()) {
      console.log(`He currently is in penality box`);
      if (this.players[this.currentPlayerIndex].deprecatedGetIsGettingOutOfPenalityBox()) {
        console.log(`And he's getting out of it`);
        this.players[this.currentPlayerIndex].providesCorrectAnswer();
        console.log(`He's got ${this.players[this.currentPlayerIndex].deprecatedGetScore()} points now`);

        var winner = this.players[this.currentPlayerIndex].didWinTheGame();
        console.log(`He ${winner ? "is" : "isn't"} the winner`);
        this.currentPlayerIndex += 1;

        if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;

        console.log(`The next player is player ${this.players[this.currentPlayerIndex].deprecatedGetName()}`);

        return winner;
      } else {
        console.log(`And he's NOT getting out of it`);

        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;
        console.log(`The next player is player ${this.players[this.currentPlayerIndex].deprecatedGetName()}`);

        return false;
      }
    } else {
      this.players[this.currentPlayerIndex].providesCorrectAnswer();
      console.log(`He's got ${this.players[this.currentPlayerIndex].deprecatedGetScore()} points now`);

      var winner = this.players[this.currentPlayerIndex].didWinTheGame();
      console.log(`He ${winner ? "is" : "isn't"} the winner`);
      this.currentPlayerIndex += 1;
      if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;

      console.log(`The next player is player ${this.players[this.currentPlayerIndex].deprecatedGetName()}`);
      return winner;
    }
  }
}
