import SetManager from "../SetManager";

class FlashCardManager {
    static TERM = 'term';

    static DEFINITION = 'definition';

    static DEFAULT_OPTIONS = {
        display: 'term',
    };

    constructor(learning, setLearning, known, setKnown, cardIdx, setCardIdx, setManager, set, display, setDisplay, options) {
        this.learning = learning;
        this.setLearning = setLearning;
        this.known = known;
        this.setKnown = setKnown;
        this.cardIdx = cardIdx;
        this.setCardIdx = setCardIdx;
        this.setManager = setManager;
        this.set = set;
        this.display = display;
        this.setDisplay = setDisplay;
        this.options = options;
    }

    setNextIdx() {
        const idx = this.cardIdx + 1;

        if (idx <= SetManager.getSetSize(this.set) && idx >= 0) {
            this.setCardIdx(idx);
        }
    }

    increaseLearning() {
        if (this.learning + this.known < SetManager.getSetSize(this.set)) {
            this.setManager.decreaseCardScore(this.set, this.cardIdx);
            this.setLearning(this.learning + 1);
            this.setDisplay(this.options.display);
            this.setNextIdx();
        }
    }

    increaseKnown() {
        if (this.learning + this.known < SetManager.getSetSize(this.set)) {
            this.setManager.increaseCardScore(this.set, this.cardIdx);
            this.setKnown(this.known + 1);
            this.setDisplay(this.options.display);
            this.setNextIdx();
        }
    }

    flipCard() {
        this.setDisplay(this.display === FlashCardManager.TERM ? FlashCardManager.DEFINITION : FlashCardManager.TERM);
    }

    getDisplay() {
        return SetManager.getCardValue(this.set, this.cardIdx, this.display);
    }
}

export default FlashCardManager;
