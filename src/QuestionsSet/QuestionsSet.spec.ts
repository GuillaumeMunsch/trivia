import QuestionsSet from "./QuestionsSet";

describe("QuestionsSet", () => {
  it("Should get a pop question", () => {
    // GIVEN
    const questionsSet = new QuestionsSet("Pop");

    // WHEN
    const question = questionsSet.getNextQuestion();

    // THEN
    expect(question).toEqual("Pop Question 0");
  });

  it("Should get a science question", () => {
    // GIVEN
    const questionsSet = new QuestionsSet("Science");

    // WHEN
    const question = questionsSet.getNextQuestion();

    // THEN
    expect(question).toEqual("Science Question 0");
  });

  it("Should crete a set of 2 questions only", () => {
    // GIVEN
    const questionsSet = new QuestionsSet("Rock", 2);

    // WHEN
    const question1 = questionsSet.getNextQuestion();
    const question2 = questionsSet.getNextQuestion();
    const question3 = questionsSet.getNextQuestion();

    // THEN
    expect(question1).toEqual("Rock Question 0");
    expect(question2).toEqual("Rock Question 1");
    expect(question3).toEqual(undefined);
  });
});
