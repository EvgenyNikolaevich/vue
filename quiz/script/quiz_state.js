import { AnswersInitializer } from './answers_initializer.js';

export class QuizState {
    constructor(jsonData) {
        this.initializers = jsonData.map((item) => {
            return new AnswersInitializer(item.question, item.correct_answer, item.incorrect_answers);
        });
        this.count = 0;
    }

    increaseCount() {
        this.count += 1;
    }

    getCount() {
        return this.count;
    }

    getState() {
        return this.initializers[this.count];
    }

    getStateByIndex(count) {
        return this.initializers[count];
    }
}
