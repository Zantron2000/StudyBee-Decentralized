class MatchManager {
    static SYMBOL = 'mt';

    static shuffle(array) {
        return array
            .map((value) => [Math.random(), value])
            .sort((a, b) => a[0] - b[0])
            .map((value) => value[1]);
    }

    static generateMTQuestion(cards, ask) {
        const ids = cards.map((c) => c.id);
        const leftOrder = MatchManager.shuffle(ids);
        const rightOrder = MatchManager.shuffle(ids);

        return { cards, ask, type: MatchManager.SYMBOL, leftOrder, rightOrder };
    }
}

export default MatchManager;
