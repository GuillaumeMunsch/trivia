import Board from "./Board";

describe("Board", () => {
  it("Should move from 0 to 1", () => {
    // GIVEN

    // WHEN
    const nextPosition = Board.move({ from: 0, value: 1 });

    // THEN
    expect(nextPosition).toEqual(1);
  });

  it("Should move from 0 to 11", () => {
    // GIVEN

    // WHEN
    const nextPosition = Board.move({ from: 0, value: 11 });

    // THEN
    expect(nextPosition).toEqual(11);
  });

  it("Should move from 0 to 0 with a value of 12", () => {
    // GIVEN

    // WHEN
    const nextPosition = Board.move({ from: 0, value: 12 });

    // THEN
    expect(nextPosition).toEqual(0);
  });
});
