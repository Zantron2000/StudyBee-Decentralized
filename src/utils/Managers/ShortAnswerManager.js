class WrittenManager {
    static SYMBOL = 'sa';

    static generateSAQuestion(card, ask) {
        return { card, ask, type: WrittenManager.SYMBOL };
    }
}

export default WrittenManager;
