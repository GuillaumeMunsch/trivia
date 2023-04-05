import AllQuestionsSet from "./AllQuestionsSet/AllQuestionsSet";
import Board from "./Board/Board";

export type Category = "Pop" | "Science" | "Sports" | "Rock";

export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;
  private questionsSet: AllQuestionsSet;

  constructor() {
    this.questionsSet = new AllQuestionsSet();
  }

  public add(name: string) {
    this.players.push(name);
    console.log(`Adding player ${name} to the game`);
    const numberOfPlayers = this.howManyPlayers();
    this.places[numberOfPlayers - 1] = 0;
    this.purses[numberOfPlayers - 1] = 0;
    this.inPenaltyBox[numberOfPlayers - 1] = false;
  }

  private howManyPlayers(): number {
    console.log(`Number of players: ${this.players.length}`);
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(`Player ${this.players[this.currentPlayer]} rolled ${roll}`);
    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`While in penalityBox`);

      if (roll % 2 != 0) {
        console.log(`He rolled an odd number`);
        this.isGettingOutOfPenaltyBox = true;
        if (this.isGettingOutOfPenaltyBox === true) console.log(`He might get out of penality box`);

        this.places[this.currentPlayer] = Board.move({
          from: this.places[this.currentPlayer],
          value: roll,
        });
        console.log(`He moves to place ${this.places[this.currentPlayer]}`);

        this.askQuestion();
      } else {
        console.log(`He won't get out of penality box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      console.log(`While not being in penalityBox`);

      this.places[this.currentPlayer] = Board.move({
        from: this.places[this.currentPlayer],
        value: roll,
      });
      console.log(`He moves to place ${this.places[this.currentPlayer]}`);

      this.askQuestion();
    }
  }

  private askQuestion(): void {
    const currentCategory = this.currentCategory();
    console.log(`Asking question: ${this.questionsSet.getNextQuestion(currentCategory)}`);
  }

  private currentCategory(): Category {
    const categories: Category[] = ["Pop", "Science", "Sports", "Rock"];
    const currentCategory = categories[this.places[this.currentPlayer] % 4];
    return currentCategory;
  }

  private didPlayerWin(): boolean {
    console.log(
      `Player ${this.players[this.currentPlayer]} did${this.purses[this.currentPlayer] == 6 ? "" : " not"} win`
    );

    return this.purses[this.currentPlayer] == 6;
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} answered wrongly`);

    this.inPenaltyBox[this.currentPlayer] = true;
    if (this.inPenaltyBox[this.currentPlayer] === true) console.log(`He is put in penality box`);

    this.currentPlayer += 1;

    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    console.log(`The current player is now ${this.players[this.currentPlayer]}`);

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} answered correctly`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`He currently is in penality box`);
      if (this.isGettingOutOfPenaltyBox) {
        this.inPenaltyBox[this.currentPlayer] = false;
        console.log(`And he's getting out of it`);
        this.purses[this.currentPlayer] += 1;

        console.log(`He's got ${this.purses[this.currentPlayer]} points now`);

        var winner = this.didPlayerWin();
        console.log(`He ${winner ? "is" : "isn't"} the winner`);

        this.currentPlayer += 1;

        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        console.log(`The next player is player ${this.players[this.currentPlayer]}`);

        return winner;
      } else {
        console.log(`And he's NOT getting out of it`);

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        console.log(`The next player is player ${this.players[this.currentPlayer]}`);

        return false;
      }
    } else {
      this.purses[this.currentPlayer] += 1;
      console.log(`He's got ${this.purses[this.currentPlayer]} points now`);

      var winner = this.didPlayerWin();
      console.log(`He ${winner ? "is" : "isn't"} the winner`);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      console.log(`The next player is player ${this.players[this.currentPlayer]}`);
      return winner;
    }
  }
}
