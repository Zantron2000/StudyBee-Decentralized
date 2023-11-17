class MatchManager {
    static SYMBOL = 'mt';

    static generateMTQuestion(cards, ask) {
        return { cards, ask, type: MatchManager.SYMBOL };
    }
}

export default MatchManager;
