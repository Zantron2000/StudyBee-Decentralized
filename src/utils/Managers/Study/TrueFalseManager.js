class TrueFalseManager {
    static SYMBOL = 'tf';

    static DEFAULT_ANSWER = 'No Answer Provided'

    static getRandomCard(cards) {
        return cards[Math.floor(Math.random() * cards.length)];
    }

    static getWrongCard(card, cards) {
        const uniqueCards = cards.filter((c) => c.id !== card.id);

        return TrueFalseManager.getRandomCard(uniqueCards);
    }

    static trueOrFalse() {
        return Math.random() < 0.5;
    }

    static generateTFQuestion(card, cards, ask) {
        const isTrue = TrueFalseManager.trueOrFalse();
        const wrongCard = isTrue ? undefined : TrueFalseManager.getWrongCard(card, cards);

        return { card, ask, wrongCard, type: TrueFalseManager.SYMBOL };
    }

    static getPossibleAnswer(question) {
        const { ask, card, wrongCard } = question;

        if (wrongCard) {
            return wrongCard[ask];
        }

        return card[ask];
    }

    static checkAnswer(question) {
        const { wrongCard, answer } = question;
        const isTrue = !wrongCard;

        return isTrue === answer;
    }

    static getCorrectAnswer(question) {
        const { wrongCard } = question;
        const isTrue = !wrongCard;

        return `${isTrue}`
    }

    static getUserAnswer(question) {
        const { answer } = question;

        return `${answer ?? TrueFalseManager.DEFAULT_ANSWER}`;
    }
}

export default TrueFalseManager;
