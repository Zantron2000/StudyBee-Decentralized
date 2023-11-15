class LearnManager {
    /**
     * The number of cards to present to the user in a round
     * 
     * @private
     * @static
     * @type {Number}
     */
    static MAX_ROUND_SIZE = 5;

    /**
     * The minimum learn value of a card to increase its tier
     * 
     * @private
     * @static
     * @type {Number}
     */
    static TIER_INCREASE = 1;

    /**
     * The minimum learn value of a card to decrease its tier
     * 
     * @private
     * @static
     * @type {Number}
     */
    static TIER_DECREASE = -3;

    static WRITTEN = 'wt';

    static MULTIPLE_CHOICE = 'mc';

    static TERM = 'term';

    static DEFINITION = 'definition';

    static BOTH = 'both';

    static shuffle(array) {
        return array
            .map((value) => [Math.random(), value])
            .sort((a, b) => a[0] - b[0])
            .map((value) => value[1]);
    }

    static configureTiers(options) {
        const tiers = [[], []];

        if (options.type === 'both') {
            tiers.push([]);
        }
        if (options.ask === 'both' && options.type !== 'mc') {
            tiers.push([]);
        }

        return tiers;
    }

    static getAllCardsFromTier(progressTier, level) {
        return progressTier.map((card) => {
            return {
                ...card,
                level,
            };
        });
    }

    static getRandomCardFromTier(progressTier, level) {
        const cards = LearnManager.getAllCardsFromTier(progressTier, level);
        return cards[Math.floor(Math.random() * cards.length)];
    };

    static isUniqueCard(card, cards) {
        return !cards.some((c) => c.id === card.id);
    }

    constructor(tiers, setTiers, options) {
        this.tiers = tiers;
        this.setTiers = setTiers;
        this.options = options;
    }

    getTotalProgressCards() {
        const progressTiers = this.tiers.filter((tier, index) => index !== this.tiers.length - 1);

        return progressTiers.reduce((acc, tier) => {
            return acc + tier.length;
        }, 0);
    };

    getTotalFinishedCards() {
        const level = this.tiers.length - 1;
        const finishedTier = this.tiers[level];

        return finishedTier?.length ?? 0;
    }

    getTotalUnpresentedCards() {
        const firstTier = this.tiers[0];
        const size = firstTier?.filter((card) => card.learn === undefined)?.length ?? 0;

        return size;
    }

    _getFinalTier() {
        const level = this.tiers.length - 1;

        return this.tiers[level];
    }

    _getRandomCardFromRandomProgressTier() {
        if (this.getTotalProgressCards() !== 0) {
            let card = null;

            while (!card) {
                const level = Math.floor(Math.random() * (this.tiers.length - 1));
                const tier = this.tiers[level];

                card = LearnManager.getRandomCardFromTier(tier, level);
            }

            return card;
        }

        return null;
    };

    _getRandomCardFromFinishedTier() {
        if (this.getTotalFinishedCards() !== 0) {
            const level = this.tiers.length - 1;

            return LearnManager.getRandomCardFromTier(this.tiers[level], level);
        }

        return null;
    }

    getRound() {
        const round = [];
        const totalProgressCards = this.getTotalProgressCards();
        const totalFinishedCards = this.getTotalFinishedCards();
        const progressTiers = this.tiers.filter((tier, index) => index !== this.tiers.length - 1) ?? [];
        const finishedTier = this.tiers[this.tiers.length - 1] ?? [];

        if (totalProgressCards >= LearnManager.MAX_ROUND_SIZE) {
            while (round.length < LearnManager.MAX_ROUND_SIZE) {
                const card = this._getRandomCardFromRandomProgressTier();
                if (LearnManager.isUniqueCard(card, round)) {
                    round.push(card);
                }
            }
        } else if (totalFinishedCards + totalProgressCards >= LearnManager.MAX_ROUND_SIZE) {
            round.push(
                ...progressTiers.reduce(
                    (acc, progressTier, index) => {
                        const cards = LearnManager.getAllCardsFromTier(progressTier, index);
                        return acc.concat(cards);
                    },
                    []
                )
            );

            while (round.length < LearnManager.MAX_ROUND_SIZE) {
                const card = this._getRandomCardFromFinishedTier();
                if (LearnManager.isUniqueCard(card, round)) {
                    round.push(card);
                }
            }
        } else {
            round.push(
                ...progressTiers.reduce(
                    (acc, progressTier, index) => {
                        const cards = LearnManager.getAllCardsFromTier(progressTier, index);
                        return acc.concat(cards);
                    },
                    []
                ),
                ...finishedTier.map((card) => {
                    return {
                        ...card,
                        level: this.tiers.length - 1,
                    };
                })
            );
        }

        return LearnManager.shuffle(round);
    };

    increaseLearn(id, level) {
        try {
            const progressTier = this.tiers[level];
            const finalLevel = this.tiers.length - 1;
            const cards = [...progressTier];
            const card = cards.find((c) => c.id === id);

            if (!card.learn) {
                card.learn = 0;
            }

            if (card.learn < LearnManager.TIER_INCREASE - 1 && level !== finalLevel) {
                card.learn += 1;

                const newTiers = [...this.tiers];
                this.setTiers(newTiers);
            } else if (level !== finalLevel) {
                card.learn = 0;
                const nextTier = this.tiers[level + 1];
                const nextCards = [...nextTier];
                nextCards.push(card);

                const newTiers = [...this.tiers];
                newTiers[level + 1] = nextCards;
                newTiers[level] = cards.filter((c) => c.id !== id);
                this.setTiers(newTiers);
            }
        } catch {

        }
    }

    decreaseLearn(id, level) {
        try {
            const progressTier = this.tiers[level];
            const cards = [...progressTier];
            const card = cards.find((c) => c.id === id);

            if (!card.learn) {
                card.learn = 0;
            }

            if (card.learn > LearnManager.TIER_DECREASE + 1) {
                card.learn -= 1;

                const newTiers = [...this.tiers];
                this.setTiers(newTiers);
            } else if (level !== 0) {
                card.learn = 0;
                const previousTier = this.tiers[level - 1];
                const previousCards = [...previousTier];
                previousCards.push(card);

                const newTiers = [...this.tiers];
                newTiers[level - 1] = previousCards;
                newTiers[level] = cards.filter((c) => c.id !== id);
                this.setTiers(newTiers);
            }
        } catch {

        }
    };

    processQuestion(roundQuestion) {
        const { level } = roundQuestion;
        const { type, ask } = this.options;

        if (type !== LearnManager.BOTH && ask !== LearnManager.BOTH) {
            return { type, ask }
        }
        if (type === LearnManager.BOTH && ask !== LearnManager.BOTH) {
            if (level > 0) {
                return { type: LearnManager.WRITTEN, ask }
            } else {
                return { type: LearnManager.MULTIPLE_CHOICE, ask }
            }
        }

        const askTypes = [LearnManager.TERM, LearnManager.DEFINITION];
        const askType = askTypes[Math.floor(Math.random() * askTypes.length)];

        if (type === LearnManager.MULTIPLE_CHOICE) {
            return { type, ask: askType };
        }
        if (type === LearnManager.WRITTEN) {
            if (level === 0) {
                return { type, ask: LearnManager.DEFINITION };
            } else if (level === 1) {
                return { type, ask: LearnManager.TERM };
            } else {
                return { type, ask: askType };
            }
        }

        if (level === 0) {
            return { type: LearnManager.MULTIPLE_CHOICE, ask: LearnManager.DEFINITION };
        } else if (level === 1) {
            return { type: LearnManager.WRITTEN, ask: LearnManager.TERM };
        } else if (level === 2) {
            return { type: LearnManager.WRITTEN, ask: LearnManager.DEFINITION };
        } else {
            return { type: LearnManager.WRITTEN, ask: askType };
        }
    }

    getWrongCards(id) {
        const allCards = this.tiers.reduce(
            (acc, tier, index) => {
                const cards = LearnManager.getAllCardsFromTier(tier, index);
                return acc.concat(cards);
            },
            []
        );

        const allOtherCards = allCards.filter((card) => card.id !== id);
        const wrongCards = [];

        if (allOtherCards.length <= 3) {
            return allOtherCards;
        } else {
            while (wrongCards.length < 3) {
                const card = allOtherCards[Math.floor(Math.random() * allOtherCards.length)];
                if (LearnManager.isUniqueCard(card, wrongCards)) {
                    wrongCards.push(card);
                }
            }

            return wrongCards;
        }
    };
}

export default LearnManager;
