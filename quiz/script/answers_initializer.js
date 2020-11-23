import { Answers } from './answers.js';

export class AnswersInitializer {
    constructor(question, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.answers = new Answers(correctAnswer, incorrectAnswers);
    }

    getQuestion(){
        return this.question;
    }

    getAnswersObject(){
        return this.answers;
    }
}
