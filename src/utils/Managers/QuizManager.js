import MultipleChoiceManager from "./MultipleChoiceManager";
import TrueFalseManager from "./TrueFalseManager";
import ShortAnswerManager from "./ShortAnswerManager";
import MatchManager from "./MatchManager";

class QuizManager {
    static MULTIPLE_CHOICE = MultipleChoiceManager.SYMBOL;

    static TRUE_FALSE = TrueFalseManager.SYMBOL;

    static SHORT_ANSWER = ShortAnswerManager.SYMBOL;

    static MATCHING = MatchManager.SYMBOL;

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

    static getRandomAsk() {
        return Math.random() < 0.5 ? QuizManager.TERM : QuizManager.DEFINITION;
    }

    static shuffle(array) {
        return array
            .map((value) => [Math.random(), value])
            .sort((a, b) => a[0] - b[0])
            .map((value) => value[1]);
    }

    static getRandomType(types) {
        return types[Math.floor(Math.random() * types.length)];
    }

    static getQuestionTypeSizes(options) {
        const { types, size } = options;
        const sizes = {};
        const remaining = size % types.length;

        types.forEach((type) => {
            sizes[type] = Math.floor(size / types.length);
        });

        if (remaining) {
            types.slice(0, remaining).forEach((type) => {
                sizes[type] += 1;
            });
        }
    };

    constructor(questions, setQuestions, options, cards) {
        this.questions = questions;
        this.setQuestions = setQuestions;
        this.options = options;

        if (!questions.length) {
            this.generateQuestions(cards);
        }
    }

    getAsk() {
        if (this.options.ask === QuizManager.BOTH) {
            return QuizManager.getRandomAsk();
        }

        return this.options.ask;
    }

    generateQuestions(cards) {
        const shuffledCards = QuizManager.shuffle(cards);
        const questionCards = shuffledCards.slice(0, this.options.size);
        const tempQuestions = [];
        const matchingCards = [];

        questionCards.forEach((card, index) => {
            const typeIndex = index % this.options.types.length;
            const type = this.options.types[typeIndex];

            if (type === MultipleChoiceManager.SYMBOL) {
                const question = MultipleChoiceManager.generateMCQuestion(card, shuffledCards, this.getAsk());
                tempQuestions.push(question);
            } else if (type === TrueFalseManager.SYMBOL) {
                const question = TrueFalseManager.generateTFQuestion(card, shuffledCards, this.getAsk());
                tempQuestions.push(question);
            } else if (type === ShortAnswerManager.SYMBOL) {
                const question = ShortAnswerManager.generateSAQuestion(card, this.getAsk());
                tempQuestions.push(question);
            } else if (type === QuizManager.MATCHING) {
                matchingCards.push(card);
            }
        });

        if (matchingCards.length) {
            const question = MatchManager.generateMTQuestion(matchingCards, this.getAsk());
            tempQuestions.push(question);
        }

        const shuffledQuestions = QuizManager.shuffle(tempQuestions);
        this.setQuestions(shuffledQuestions);
    }
}

export default QuizManager;
