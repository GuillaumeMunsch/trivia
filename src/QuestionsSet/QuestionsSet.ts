import { Category } from "..";

class QuestionsSet {
  private questions: string[] = [];

  constructor(category: Category, numberOfQuestion = 50) {
    this.questions = [...new Array(numberOfQuestion)].map((_, index) => `${category} Question ${index}`);
  }

  getNextQuestion = () => {
    const [question, ...remainingQuestions] = this.questions;
    this.questions = remainingQuestions;
    return question;
  };
}

export default QuestionsSet;
