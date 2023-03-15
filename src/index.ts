type Category = "Pop" | "Science" | "Sports" | "Rock";

export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
    }
    console.log(`Pop questions: ${this.popQuestions.length}`);
    console.log(`Science questions: ${this.scienceQuestions.length}`);
    console.log(`Sports questions: ${this.sportsQuestions.length}`);
    console.log(`Rock questions: ${this.rockQuestions.length}`);
  }

  public add(name: string) {
    this.players.push(name);
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
    console.log(`Player ${this.currentPlayer} rolled ${roll}`);
    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`While in penalityBox`);

      if (roll % 2 != 0) {
        console.log(`He rolled an odd number`);
        this.isGettingOutOfPenaltyBox = true;
        if (this.isGettingOutOfPenaltyBox === true) console.log(`He might get out of penality box`);

        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;

        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }
        console.log(`He moves to place ${this.places[this.currentPlayer]}`);

        this.askQuestion();
      } else {
        console.log(`He won't get out of penality box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      console.log(`While not being in penalityBox`);

      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }
      console.log(`He moves to place ${this.places[this.currentPlayer]}`);

      this.askQuestion();
    }
  }

  private askQuestion(): void {
    const currentCategory = this.currentCategory();
    switch (currentCategory) {
      case "Pop":
        console.log(`Asking question: ${this.popQuestions.shift()}`);
        break;
      case "Science":
        console.log(`Asking question: ${this.scienceQuestions.shift()}`);
        break;
      case "Sports":
        console.log(`Asking question: ${this.sportsQuestions.shift()}`);
        break;
      case "Rock":
        console.log(`Asking question: ${this.rockQuestions.shift()}`);
        break;
    }
  }

  private currentCategory(): Category {
    const categories: Category[] = ["Pop", "Science", "Sports", "Rock"];
    const currentCategory = categories[this.places[this.currentPlayer] % 4];
    return currentCategory;
  }

  private didPlayerWin(): boolean {
    console.log(`Player ${this.currentPlayer} did${this.purses[this.currentPlayer] == 6 ? "" : " not"} win`);

    return this.purses[this.currentPlayer] == 6;
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.currentPlayer} answered wrongly`);

    this.inPenaltyBox[this.currentPlayer] = true;
    if (this.inPenaltyBox[this.currentPlayer] === true) console.log(`He is put in penality box`);

    this.currentPlayer += 1;

    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    console.log(`The current player is now ${this.currentPlayer}`);

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.currentPlayer} answered correctly`);

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

        console.log(`The next player is player ${this.currentPlayer}`);

        return winner;
      } else {
        console.log(`And he's NOT getting out of it`);

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        console.log(`The next player is player ${this.currentPlayer}`);

        return false;
      }
    } else {
      this.purses[this.currentPlayer] += 1;
      console.log(`He's got ${this.purses[this.currentPlayer]} points now`);

      var winner = this.didPlayerWin();
      console.log(`He ${winner ? "is" : "isn't"} the winner`);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      console.log(`The next player is player ${this.currentPlayer}`);
      return winner;
    }
  }
}
