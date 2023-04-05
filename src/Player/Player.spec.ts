import Board from "../Board/Board";
import Player from "./Player";

describe("Player", () => {
  it("Should create a player", () => {
    // GIVEN
    const player = new Player("Mathieu");

    // WHEN
    const playerCoins = player.earnCoin();

    // THEN
    expect(playerCoins).toEqual(1);
  });

  it("Should move a player after a roll of 1", () => {
    // GIVEN
    const player = new Player("Mathieu");
    const rollValue = 1;

    // WHEN
    const playerPlace = player.roll(rollValue);

    // THEN
    expect(playerPlace).toEqual(1);
  });

  it("Should put a player in penality box when answered", () => {
    // GIVEN
    const player = new Player("Mathieu");

    // WHEN
    player.providesWrongAnswer();

    // THEN
    player.expectToBeInPenalityBox(expect)(true);
  });

  it("Should allow player to get out of penality box if he answers correctly", () => {
    // GIVEN
    const player = new Player("Mathieu");
    const rollValue = 3;

    // WHEN
    player.roll(rollValue);

    // THEN
    player.expectToBeAllowedOfOrPenalityBox(expect)(true);
  });

  it("Should not allow player to get out of penality box if he answers correctly", () => {
    // GIVEN
    const player = new Player("Mathieu");
    const rollValue = 2;

    // WHEN
    player.roll(rollValue);

    // THEN
    player.expectToBeAllowedOfOrPenalityBox(expect)(false);
  });

  it("Should player in penality box roll odd and provides correct answer", () => {
    // GIVEN
    const player = new Player("Mathieu");

    // WHEN
    player.providesWrongAnswer();
    player.roll(3);
    player.providesCorrectAnswer();

    // THEN
    player.expectToBeInPenalityBox(expect)(false);
  });

  it("Should assert that a player won", () => {
    // GIVEN
    const player = new Player("Mathieu");

    // WHEN
    player.providesCorrectAnswer();
    player.providesCorrectAnswer();
    player.providesCorrectAnswer();
    player.providesCorrectAnswer();
    player.providesCorrectAnswer();
    player.providesCorrectAnswer();

    // THEN
    expect(player.didWinTheGame()).toEqual(true);
  });

  it("Should assert that a player won", () => {
    // GIVEN
    const player = new Player("Mathieu");

    // THEN
    expect(player.deprecatedGetName()).toEqual("Mathieu");
  });
  
});
