import { shuffle } from "../../tools";

class SetManager {
    constructor(set) {
        this.set = set;
    }

    getCardByIndex(index) {
        return this.set.cards[index];
    }

    getCardById(id) {
        return this.set.cards.find(card => card.id === id);
    }

    getCardValueById(id, display) {
        const card = this.getCardById(id);

        if (card) {
            return card[display];
        }
    }

    getCardValueByIndex(index, display) {
        const card = this.getCardByIndex(index);

        if (card) {
            return card[display];
        }
    }

    getSize() {
        return this.set.cards.length;
    }

    getShuffleCards() {
        const shuffled = shuffle(this.set.cards);

        return shuffled.map((card) => card.id);
    }

    getOrderCards() {
        return this.set.cards.map((card) => card.id);
    }

    getSet() {
        return this.set;
    }

    getHash() {
        return this.set.hash;
    }
}

export default SetManager;
