import { Category } from "..";
import QuestionsSet from "../QuestionsSet/QuestionsSet";

class AllQuestionsSet {
  private questionsSets: Record<Category, QuestionsSet>;

  constructor() {
    this.questionsSets = {
      Pop: new QuestionsSet("Pop"),
      Science: new QuestionsSet("Science"),
      Sports: new QuestionsSet("Sports"),
      Rock: new QuestionsSet("Rock"),
    };
  }

  getNextQuestion = (category: Category) => this.questionsSets[category].getNextQuestion();
}

export default AllQuestionsSet;
