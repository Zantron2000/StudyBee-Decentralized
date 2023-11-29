class FormManager {
    static MAX_TITLE_LENGTH = 100;

    static MAX_DESCRIPTION_LENGTH = 500;

    static MAX_TERM_LENGTH = 250;

    static MAX_DEFINITION_LENGTH = 500;

    static DEFAULT_CARD = { term: '', definition: '' };

    static DEFAULT_SET = { title: '', description: '', cards: [FormManager.DEFAULT_CARD] };

    static DEFAULT_ERRORS = { title: false, description: false, cards: {} };

    static getDefaultCard() {
        return JSON.parse(JSON.stringify(FormManager.DEFAULT_CARD));
    }

    static getDefaultSet() {
        return JSON.parse(JSON.stringify(FormManager.DEFAULT_SET));
    }

    static getDefaultErrors() {
        return JSON.parse(JSON.stringify(FormManager.DEFAULT_ERRORS));
    }

    constructor(set, setSet, errors, setErrors) {
        this.set = set;
        this.setSet = setSet;
        this.errors = errors;
        this.setErrors = setErrors;
    }

    getTempSet() {
        return { ...this.set };
    }

    getTitle() {
        return this.set.title;
    }

    getDescription() {
        return this.set.description;
    }

    getCards() {
        return this.set.cards;
    }

    updateTitle(title) {
        if (title.length > FormManager.MAX_TITLE_LENGTH) {
            return;
        }

        const tempSet = this.getTempSet();
        tempSet.title = title;

        this.setSet(tempSet);
    }

    updateDescription(description) {
        if (description.length > FormManager.MAX_DESCRIPTION_LENGTH) {
            return;
        }

        const tempSet = this.getTempSet();
        tempSet.description = description;

        this.setSet(tempSet);
    }

    addCard() {
        const tempSet = this.getTempSet();
        tempSet.cards.push(FormManager.getDefaultCard());

        this.setSet(tempSet);
    }

    removeCard(index) {
        const tempSet = this.getTempSet();
        tempSet.cards.splice(index, 1);

        if (!tempSet.cards.length) {
            tempSet.cards.push(FormManager.getDefaultCard());
        }

        this.setSet(tempSet);
    }

    updateTerm(index, term) {
        if (term.length > FormManager.MAX_TERM_LENGTH) {
            return;
        }

        const tempSet = this.getTempSet();
        tempSet.cards[index].term = term;

        this.setSet(tempSet);
    }

    updateDefinition(index, definition) {
        if (definition.length > FormManager.MAX_DEFINITION_LENGTH) {
            return;
        }

        const tempSet = this.getTempSet();
        tempSet.cards[index].definition = definition;

        this.setSet(tempSet);
    }

    validateTitle() {
        if (!this.getTitle().length) {
            return 'Title is required';
        } else if (this.getTitle().length > FormManager.MAX_TITLE_LENGTH) {
            return `Title must be less than ${FormManager.MAX_TITLE_LENGTH} characters`;
        }
    }

    validateDescription() {
        if (this.getDescription().length > FormManager.MAX_DESCRIPTION_LENGTH) {
            return `Description must be less than ${FormManager.MAX_DESCRIPTION_LENGTH} characters`;
        } else if (!this.getDescription()) {
            return 'Description is required';
        }
    }

    validateTerm(index) {
        if (!this.getCards()[index].term.length) {
            return 'Term is required';
        } else if (this.getCards()[index].term.length > FormManager.MAX_TERM_LENGTH) {
            return `Term must be less than ${FormManager.MAX_TERM_LENGTH} characters`;
        }
    }

    validateDefinition(index) {
        if (!this.getCards()[index].definition.length) {
            return 'Definition is required';
        } else if (this.getCards()[index].definition.length > FormManager.MAX_DEFINITION_LENGTH) {
            return `Definition must be less than ${FormManager.MAX_DEFINITION_LENGTH} characters`;
        }
    }

    validate() {
        let isValid = true;
        let tempErrors = { ...this.errors };

        if (this.validateTitle()) {
            tempErrors.title = this.validateTitle();

            isValid = false;
        } else {
            tempErrors.title = undefined;
        }

        if (this.validateDescription()) {
            tempErrors.description = this.validateDescription();

            isValid = false;
        } else {
            tempErrors.description = undefined;
        }

        this.getCards().forEach((_card, index) => {
            const term = this.validateTerm(index)
            const definition = this.validateDefinition(index)

            tempErrors = { ...tempErrors, cards: { ...tempErrors.cards, [index]: { definition, term } } };
            if (term || definition) {
                isValid = false;
            }
        });

        this.setErrors(tempErrors);
        return isValid;
    }
}

export default FormManager;
