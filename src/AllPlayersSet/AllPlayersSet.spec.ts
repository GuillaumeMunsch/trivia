import Player from "../Player/Player";
import AllPlayersSet from "./AllPlayersSet";

describe("AllPlayersSet", () => {
  it("Should add a player", () => {
    // GIVEN
    const allPlayersSet = new AllPlayersSet();

    // WHEN
    allPlayersSet.addPlayer(new Player("Mathieu"));

    // THEN
    expect(allPlayersSet.getCurrentPlayer().deprecatedGetName()).toEqual("Mathieu");
  });

  it("Should add 2 players", () => {
    // GIVEN
    const allPlayersSet = new AllPlayersSet();

    // WHEN
    allPlayersSet.addPlayer(new Player("Mathieu"));
    allPlayersSet.addPlayer(new Player("Guillaume"));

    // THEN
    expect(allPlayersSet.getCurrentPlayer().deprecatedGetName()).toEqual("Mathieu");
  });

  it("Should add 2 players and switch to second", () => {
    // GIVEN
    const allPlayersSet = new AllPlayersSet();

    // WHEN
    allPlayersSet.addPlayer(new Player("Mathieu"));
    allPlayersSet.addPlayer(new Player("Guillaume"));
    allPlayersSet.switchPlayer();

    // THEN
    expect(allPlayersSet.getCurrentPlayer().deprecatedGetName()).toEqual("Guillaume");
  });
});
