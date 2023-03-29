import AllQuestionsSet from "./AllQuestionsSet";

describe("AllQuestionsSet", () => {
  it("Should get the first Pop question", () => {
    // GIVEN
    const allQuestionsSet = new AllQuestionsSet();

    // WHEN
    const popQuestion = allQuestionsSet.getNextQuestion("Pop");

    // THEN
    expect(popQuestion).toEqual("Pop Question 0");
  });

  it("Should get the first Science question", () => {
    // GIVEN
    const allQuestionsSet = new AllQuestionsSet();

    // WHEN
    const scienceQuestion = allQuestionsSet.getNextQuestion("Science");

    // THEN
    expect(scienceQuestion).toEqual("Science Question 0");
  });
});
