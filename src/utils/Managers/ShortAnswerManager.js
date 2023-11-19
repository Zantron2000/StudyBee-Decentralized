class ShortAnswerManager {
    static SYMBOL = 'sa';

    static generateSAQuestion(card, ask) {
        return { card, ask, type: ShortAnswerManager.SYMBOL };
    }

    static checkAnswer(question) {
        const { card, answer, ask } = question;

        return card[ask] === answer;
    }

    static getCorrectAnswer(question) {
        const { card, ask } = question;

        return card[ask];
    }

    static getUserAnswer(question) {
        const { answer } = question;

        return answer;
    }
}

export default ShortAnswerManager;
