// eslint-disable-next-line import/no-extraneous-dependencies
import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

describe("Trivia", () => {
  it("Create game", async () => {
    runGoldenMaster(async () => {
      // GIVEN

      // WHEN
      const game = new Game();
    });
  });

  it("Add 3 player", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();

      // WHEN
      game.add("Mathieu");
      game.add("Guillaume");
      game.add("Max");
    });
  });

  it("2 rolls of 1", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");

      // WHEN
      game.roll(1);
      game.roll(1);
    });
  });

  it("5 rolls of 1", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");

      // WHEN
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
    });
  });

  it("Ask all categories", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");

      // WHEN
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
      game.roll(1);
    });
  });

  it("Answer wrong and change player", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.add("Guillaume");
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);

      // WHEN
      game.wrongAnswer();
    });
  });

  it("Wrong answer, roll odd and out of bounds", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wrongAnswer();

      // WHEN
      game.roll(7);
      game.roll(7);
    });
  });

  it("Wrong answer of last player and reset current player to first in list", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();

      // WHEN
      game.add("Mathieu");
      game.add("Guillaume");
      game.wrongAnswer();
    });
  });

  it("Correctly answered by in penality player and getting out of it", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();

      // WHEN
      game.add("Mathieu");
      game.wrongAnswer();
      game.roll(1);
      game.wasCorrectlyAnswered();
    });
  });

  it("Correctly answered by in penality player and getting out of it but not last player", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();

      // WHEN
      game.add("Mathieu");
      game.add("Guillaume");
      game.wrongAnswer();
      game.roll(1);
      game.wasCorrectlyAnswered();
    });
  });

  it("Correctly answered by in penality player and NOT getting out of it", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();

      // WHEN
      game.add("Mathieu");
      game.wrongAnswer();
      game.roll(2);
      game.wasCorrectlyAnswered();
    });
  });

  it("Correct answer, roll and out of bounds", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wasCorrectlyAnswered();

      // WHEN
      game.roll(7);
      game.roll(7);
    });
  });

  it("Correct answer, roll and out of bounds", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wrongAnswer();

      // WHEN
      game.roll(6);
      game.wasCorrectlyAnswered();
    });
  });

  it("Answer correctly", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);

      // WHEN
      game.wasCorrectlyAnswered();
    });
  });

  it("Answer wrongly", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);

      // WHEN
      game.wrongAnswer();
    });
  });

  it("Answer wrongly and then roll even", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wrongAnswer();

      // WHEN
      game.roll(2);
    });
  });

  it("Answer wrongly and then roll odd", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wrongAnswer();

      // WHEN
      game.roll(3);
    });
  });

  it("Answer wrongly and then roll odd and then answer correctly", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");
      game.roll(1);
      game.wrongAnswer();
      game.roll(3);

      // WHEN
      game.wasCorrectlyAnswered();
    });
  });

  it("Answer 6 times correctly", async () => {
    runGoldenMaster(async () => {
      // GIVEN
      const game = new Game();
      game.add("Mathieu");

      // WHEN
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
    });
  });

  it("My global scenario", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.add("Clément");
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wrongAnswer();
      game.roll(1);
      game.wrongAnswer();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wrongAnswer();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wasCorrectlyAnswered();
    });
  });
});