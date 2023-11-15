class QuizManager {
    static MULTIPLE_CHOICE = 'mc';

    static TRUE_FALSE = 'tf';

    static SHORT_ANSWER = 'sa';

    static MATCHING = 'mt';

    static BOTH = 'both';

    static TERM = 'term';

    static DEFINITION = 'definition';

    static DEFAULT_OPTIONS = {
        types: [
            QuizManager.MULTIPLE_CHOICE,
            QuizManager.TRUE_FALSE,
            QuizManager.SHORT_ANSWER,
            QuizManager.MATCHING
        ],
        ask: QuizManager.BOTH,
    }

    static getDefaultOptions(set) {
        return {
            ...QuizManager.DEFAULT_OPTIONS,
            size: set.cards.length,
        };
    }
}

export default QuizManager;
