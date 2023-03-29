import Player from "./Player";

describe("Player", () => {
  it("Should create a player", () => {
    // GIVEN
    const player = new Player();

    // WHEN
    const playerCoins = player.earnCoin();

    // THEN
    expect(playerCoins).toEqual(1);
  });
});
