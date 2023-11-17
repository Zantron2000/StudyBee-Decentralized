class TrueFalseManager {
    static SYMBOL = 'tf';

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
}

export default TrueFalseManager;
