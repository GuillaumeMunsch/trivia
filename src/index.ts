import AllPlayersSet from "./AllPlayersSet/AllPlayersSet";
import AllQuestionsSet from "./AllQuestionsSet/AllQuestionsSet";
import Player from "./Player/Player";

export type Category = "Pop" | "Science" | "Sports" | "Rock";

export class Game {
  private allPlayersSet: AllPlayersSet = new AllPlayersSet();
  private questionsSet: AllQuestionsSet = new AllQuestionsSet();

  public add(name: string) {
    this.allPlayersSet.addPlayer(new Player(name));
  }

  public roll(roll: number) {
    this.allPlayersSet.getCurrentPlayer().roll({ rollValue: roll, questionsSet: this.questionsSet });
  }

  public wrongAnswer(): boolean {
    this.allPlayersSet.getCurrentPlayer().providesWrongAnswer();

    this.allPlayersSet.switchPlayer();

    console.log(`The current player is now ${this.allPlayersSet.getCurrentPlayer().deprecatedGetName()}`);

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.allPlayersSet.getCurrentPlayer().deprecatedGetName()} answered correctly`);

    if (this.allPlayersSet.getCurrentPlayer().deprecatedGetIsInPenalityBox()) {
      console.log(`He currently is in penality box`);
      if (this.allPlayersSet.getCurrentPlayer().deprecatedGetIsGettingOutOfPenalityBox()) {
        console.log(`And he's getting out of it`);
        this.allPlayersSet.getCurrentPlayer().providesCorrectAnswer();
        console.log(`He's got ${this.allPlayersSet.getCurrentPlayer().deprecatedGetScore()} points now`);

        var winner = this.allPlayersSet.getCurrentPlayer().didWinTheGame();
        console.log(`He ${winner ? "is" : "isn't"} the winner`);
        this.allPlayersSet.switchPlayer();

        console.log(`The next player is player ${this.allPlayersSet.getCurrentPlayer().deprecatedGetName()}`);

        return winner;
      } else {
        console.log(`And he's NOT getting out of it`);

        this.allPlayersSet.switchPlayer();
        console.log(`The next player is player ${this.allPlayersSet.getCurrentPlayer().deprecatedGetName()}`);

        return false;
      }
    } else {
      this.allPlayersSet.getCurrentPlayer().providesCorrectAnswer();
      console.log(`He's got ${this.allPlayersSet.getCurrentPlayer().deprecatedGetScore()} points now`);

      var winner = this.allPlayersSet.getCurrentPlayer().didWinTheGame();
      console.log(`He ${winner ? "is" : "isn't"} the winner`);
      this.allPlayersSet.switchPlayer();

      console.log(`The next player is player ${this.allPlayersSet.getCurrentPlayer().deprecatedGetName()}`);
      return winner;
    }
  }
}
