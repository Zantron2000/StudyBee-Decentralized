import SetManager from '../Set/SetManager';

class FlashCardManager {
    static TERM = 'term';

    static DEFINITION = 'definition';

    static IN_ORDER = 'inOrder';

    static RANDOM = 'random';

    static DEFAULT_OPTIONS = {
        display: FlashCardManager.TERM,
        order: FlashCardManager.IN_ORDER,
    };

    constructor(learning, setLearning, known, setKnown, cardIdx, setCardIdx, keplerManager, set, display, setDisplay, options, order, setOrder) {
        this.learning = learning;
        this.setLearning = setLearning;
        this.known = known;
        this.setKnown = setKnown;
        this.cardIdx = cardIdx;
        this.setCardIdx = setCardIdx;
        this.keplerManager = keplerManager;
        this.set = new SetManager(set);
        this.display = display;
        this.setDisplay = setDisplay;
        this.options = options;
        this.order = order;
        this.setOrder = setOrder;
    }

    initialize() {
        this.setLearning(0);
        this.setKnown(0);
        this.setCardIdx(0);
        this.setDisplay(this.options.display);
        this.createOrder();
    }

    createOrder() {
        const { order: cardOrder } = this.options;
        if (cardOrder === FlashCardManager.RANDOM) {
            this.setOrder(this.set.getShuffleCards());
        } else {
            this.setOrder(this.set.getOrderCards());
        }
    }

    setNextIdx() {
        const idx = this.cardIdx + 1;

        if (idx <= this.set.getSize() && idx >= 0) {
            this.setCardIdx(idx);
        }
    }

    increaseLearning() {
        if (this.learning + this.known < this.set.getSize()) {
            this.keplerManager.decreaseCardScore(this.set.getSet(), this.cardIdx);
            this.setLearning(this.learning + 1);
            this.setDisplay(this.options.display);
            this.setNextIdx();
        }
    }

    increaseKnown() {
        if (this.learning + this.known < this.set.getSize()) {
            this.keplerManager.increaseCardScore(this.set.getSet(), this.cardIdx);
            this.setKnown(this.known + 1);
            this.setDisplay(this.options.display);
            this.setNextIdx();
        }
    }

    flipCard() {
        this.setDisplay(this.display === FlashCardManager.TERM ? FlashCardManager.DEFINITION : FlashCardManager.TERM);
    }

    getDisplay() {
        const id = this.order[this.cardIdx];
        return this.set.getCardValueById(id, this.display);
    }
}

export default FlashCardManager;
