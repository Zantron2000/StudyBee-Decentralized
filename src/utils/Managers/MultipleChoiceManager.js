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

    static generateMCQuestion(card, cards, ask) {
        const wrongCards = MultipleChoiceManager.getWrongCards(card, cards);

        return { card, ask, wrongCards, type: MultipleChoiceManager.SYMBOL };
    }
}

export default MultipleChoiceManager;
