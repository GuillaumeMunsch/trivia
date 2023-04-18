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

    return false;
  }

  private verifyScoreAndIfWon = () => {
    this.allPlayersSet.getCurrentPlayer().providesCorrectAnswer();

    var winner = this.allPlayersSet.getCurrentPlayer().didWinTheGame();
    return winner;
  };

  public wasCorrectlyAnswered(): boolean {
    if (!this.allPlayersSet.getCurrentPlayer().deprecatedGetIsInPenalityBox()) {
      const winner = this.verifyScoreAndIfWon();
      this.allPlayersSet.switchPlayer();

      return winner;
    }

    if (this.allPlayersSet.getCurrentPlayer().deprecatedGetIsGettingOutOfPenalityBox()) {
      const winner = this.verifyScoreAndIfWon();
      this.allPlayersSet.switchPlayer();
      return winner;
    }

    this.allPlayersSet.switchPlayer();

    return false;
  }
}
