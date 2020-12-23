export class Answers {
    constructor(correctAnswer, incorrectAnswers) {
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
    }

    get answers() {
        const allAnswers = this.incorrectAnswers.concat(this.correctAnswer);
        const sortedAnswers = allAnswers.sort(() => Math.random() - 0.5);

        return sortedAnswers;
    }

    initRadioButtons(id) {
        const answersContainer = document.getElementById('answers_container');
        const answersDiv = document.createElement('div');

        answersDiv.id = 'answers_' + id;
        answersContainer.appendChild(answersDiv);

        this.answers.forEach((item, index, _array) => {
            const inputElement = document.createElement('input');
            const labelForAnswer = document.createElement('label');

            inputElement.type = 'radio';
            inputElement.name = 'answers';
            inputElement.value = item;
            inputElement.id = `answer_${id}${index}`;

            labelForAnswer.innerHTML = item;
            labelForAnswer.setAttribute('for', inputElement.id);

            labelForAnswer.appendChild(inputElement);
            answersDiv.appendChild(labelForAnswer);
        });
    }

    showRadioButtons(id) {
        const answersDiv = document.getElementById(`answers_${id}`);

        answersDiv.setAttribute('hidden', false);
    }

    hideRadioButtons(id) {
        const answersDiv = document.getElementById(`answers_${id}`);

        answersDiv.setAttribute('hidden', true);
    }

    update(count, correctAnswersCount, numberOfQuestion) {
        const correctAnswerElement = document.getElementById('correct_answers');
        const incorrectAnswerElement = document.getElementById('incorrect_answers');
        const countOfCorrectAnswers = correctAnswersCount;
        const countOfIncorrectAnswers = numberOfQuestion - correctAnswersCount;

        correctAnswerElement.innerHTML += countOfCorrectAnswers;
        incorrectAnswerElement.innerHTML += countOfIncorrectAnswers;
    }

    getAnswerCorrectness(choosedAnswer) {
        return choosedAnswer === this.correctAnswer;
    }
}
