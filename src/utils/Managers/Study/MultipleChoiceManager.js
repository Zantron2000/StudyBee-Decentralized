class MultipleChoiceManager {
    static MAX_WRONG_ANSWERS = 3;

    static SYMBOL = 'mc';

    static getRandomCard(cards) {
        return cards[Math.floor(Math.random() * cards.length)];
    }

    static getWrongCards(card, cards) {
        let uniqueCards = cards.filter((c) => c.id !== card.id);
        let wrongCards = [];

        if (uniqueCards.length <= MultipleChoiceManager.MAX_WRONG_ANSWERS) {
            return uniqueCards;
        } else {
            while (wrongCards.length < MultipleChoiceManager.MAX_WRONG_ANSWERS) {
                let wrongCard = MultipleChoiceManager.getRandomCard(uniqueCards);

                if (!wrongCards.some((c) => c.id === wrongCard.id)) {
                    wrongCards.push(wrongCard);
                }
            }
        }

        return wrongCards;
    }

    static shuffle(array) {
        return array
            .map((value) => [Math.random(), value])
            .sort((a, b) => a[0] - b[0])
            .map((value) => value[1]);
    }

    static generateMCQuestion(card, cards, ask) {
        const wrongCards = MultipleChoiceManager.getWrongCards(card, cards);
        const order = MultipleChoiceManager.shuffle([card.id, ...wrongCards.map((c) => c.id)]);

        return { card, ask, wrongCards, type: MultipleChoiceManager.SYMBOL, order };
    }

    static getCard(id, question) {
        const { card, wrongCards } = question;

        if (card.id === id) {
            return card;
        }

        return wrongCards.find((c) => c.id === id);
    }

    static checkAnswer(question) {
        const { card, answer } = question;
        const { id } = card;

        return id === answer;
    }

    static getCorrectAnswer(question) {
        const { order, card, ask } = question;
        const index = order.indexOf(card.id);

        return `${index + 1}. ${card[ask]}`
    }

    static getUserAnswer(question) {
        const { answer, ask } = question;
        const card = MultipleChoiceManager.getCard(answer, question);

        return card[ask];
    }
}

export default MultipleChoiceManager;
