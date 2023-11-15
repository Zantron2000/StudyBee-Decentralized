import NavigationManager from "./Managers/NavigationManager";
import SSXManager from './SSXManager'

/**
 * A class that manages getting and setting set data
 */
class SetManager {
    /**
     * The prefix for all data stored in kepler for StudyBee. Used
     * to help prevent possible collision with other apps using the same orbit
     * 
     * @type {string}
     */
    static prefix = "StudyBee/"

    /**
     * The key for the general info of all sets
     * 
     * @type {string}
     */
    static sets = "sets";

    /**
     * The size of the hash for a set
     * 
     * @type {number}
     */
    static hashSize = 6;

    /**
     * Creates a new set manager
     * 
     * @param {import("@spruceid/ssx").SSX} ssx The SSX instance to use
     * @param {import("react-router-dom").NavigateFunction} navigator The navigator function to use
     */
    constructor(ssx, navigator) {
        this.ssx = ssx;
        this.ssxManager = new SSXManager(ssx);
        this.navigator = new NavigationManager(navigator)
    };

    /**
     * Generates a hash that composes of random alphanumeric characters
     * of the specified length in SetManager.hashSize
     * 
     * @returns {string} The generated hash
     */
    static generateHash() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let hash = "";

        for (let i = 0; i < SetManager.hashSize; i++) {
            hash += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return hash;
    }

    /**
     * Adds ids to all cards in a set
     * 
     * @param {StudySet} set The set to add ids to
     */
    static addCardIds(set) {
        set.cards.forEach((card, index) => {
            card.id = index;
        });
    }

    /**
     * Checks if a set is a valid StudySet
     * 
     * @param {StudySet} set The set to check
     * @returns {boolean} Whether or not the set is a valid StudySet
     */
    static isValidSet(set) {
        try {
            const validTitle = set.title.length > 0;
            const validDescription = set.description.length > 0;
            const validHash = set.hash.length === SetManager.hashSize;

            // Check cards last just in case the other checks fail
            return validTitle &&
                validDescription &&
                validHash &&
                set.cards.length > 0 &&
                set.cards.every(card => card.term.length > 0 && card.definition.length > 0 && card.id >= 0);
        } catch (error) {
            return false;
        }
    };

    /**
     * Transforms a Study Set to a generic set, so it contains
     * only the information needed to display the set in a list
     * 
     * @param {StudySet} set The set to transform
     * @returns {KeplerGenericSet} The transformed set
     */
    static transformStudySetToGenericSet(set) {
        const { description, cards, ...genericSet } = set;

        return genericSet;
    }

    /**
     * Transforms a Study Set to a Kepler set, so it contains
     * only the information needed for the specific set page
     * 
     * @param {StudySet} set The set to transform
     * @returns {KeplerSet} The transformed set
     */
    static transformStudySetToKeplerSet(set) {
        const { title, hash, size, accuracy, ...keplerSet } = set;

        return keplerSet;
    }

    /**
     * Combines a generic set with a Kepler set to create a Study Set
     * 
     * @param {KeplerGenericSet} genericSet The generic set to combine
     * @param {KeplerSet} keplerSet The Kepler set to combine
     * @returns {StudySet} The combined set
     */
    static formFullSet(genericSet, keplerSet) {
        if (genericSet && keplerSet) {
            return {
                ...genericSet,
                ...keplerSet
            };
        } else if (genericSet) {
            return genericSet
        } else {
            return keplerSet;
        }
    }

    async initializeSets() {
        try {
            const response = await this.ssx.storage.put(`${SetManager.prefix}${SetManager.sets}`, { sets: [] });

            if (!response.ok) {
                throw new Error("Failed to initialize sets");
            };
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Gets all generic set info
     * 
     * @returns {Promise<KeplerGenericSet[]>} A promise that resolves to an array of general set info
     */
    async getSets() {
        try {
            const response = await this.ssx.storage.get(`${SetManager.prefix}${SetManager.sets}`);

            if (response.ok) {
                return response.data.sets;
            } else if (response.status === 404) {
                await this.initializeSets();
                return [];
            }

            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * Gets the set data for a specific set
     * 
     * @param {string} hash The hash of the set to get
     * @returns {Promise<KeplerSet>} A promise that resolves to the set data
     */
    async getSet(hash) {
        try {
            const set = await this.ssx.storage.get(`${SetManager.prefix}${hash}`);

            if (set.ok) {
                return set.data;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Generates a hash for a passed in set, then adds it's information to the general set info
     * and adds the set to the storage. It must first check if a set with a given hash already exists
     * and if so, it must generate a new hash
     * 
     * @param {StudySet} set The set to add
     * @returns {Promise<string>} A promise that resolves to the hash of the set
     */
    async addSet(set) {
        SetManager.addCardIds(set);

        let hash = SetManager.generateHash();
        let setExists = await this.getSet(hash);

        while (setExists) {
            hash = SetManager.generateHash();
            setExists = await this.getSet(hash);
        }

        const generalSetInfo = await this.getSets();
        generalSetInfo.push({
            title: set.title,
            hash,
            size: set.cards.length,
        });

        const sets = {
            sets: generalSetInfo
        }

        try {
            await this.ssx.storage.put(`${SetManager.prefix}${hash}`, set);
            await this.ssx.storage.put(`${SetManager.prefix}${SetManager.sets}`, sets);

            return hash;
        } catch (error) {
            console.error(error);
            return null
        }
    };

    /**
     * Deletes a set from storage
     * 
     * @param {string} hash The hash of the set to delete
     */
    async deleteSet(hash) {
        const generalSetInfo = await this.getSets();
        const newGeneralSetInfo = generalSetInfo.filter(set => set.hash !== hash);

        const sets = {
            sets: newGeneralSetInfo
        }

        try {
            await this.ssx.storage.put(`${SetManager.prefix}${SetManager.sets}`, sets);
            await this.ssx.storage.delete(`${SetManager.prefix}${hash}`);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Updates a set in storage
     * 
     * @param {string} hash The hash of the set to update
     * @param {Set} set The set to update
     */
    async updateSet(hash, set) {
        const generalSetInfo = await this.getSets();
        const newGeneralSetInfo = generalSetInfo.map(generalSet => {
            if (generalSet.hash === hash) {
                return {
                    title: set.title,
                    hash,
                    size: set.cards.length,
                    accuracy: 0
                };
            }

            return set;
        });

        const sets = {
            sets: newGeneralSetInfo
        }

        try {
            await this.ssx.storage.put(`${SetManager.prefix}${hash}`, set);
            await this.ssx.storage.put(`${SetManager.prefix}${SetManager.sets}`, sets);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Upserts a set in storage. Updates if the set contains a hash, otherwise adds the set
     * 
     * @param {StudySet} set The set to upsert
     * @returns {Promise<string>} A promise that resolves to the hash of the set
     */
    async upsertSet(set) {
        if (set.hash) {
            await this.updateSet(set.hash, set);
            return set.hash;
        }

        return await this.addSet(set);
    };

    /**
     * Given the hash, gets a set's generic information and it's specific information,
     * combines it into a StudySet, and returns it
     * 
     * @param {string} hash The hash of the set to get
     * @returns {Promise<StudySet>} A promise that resolves to the set
     */
    async getCompleteSet(hash) {
        const genericSets = await this.getSets();
        const genericSet = genericSets.find(set => set.hash === hash);
        const specificSet = await this.getSet(hash);

        return SetManager.formFullSet(genericSet, specificSet);
    }

    /**
     * Increases the score of a card in a set
     * 
     * @param {StudySet} set The set to update
     * @param {Number} cardId The id of the card to update
     */
    async increaseCardScore(set, cardId) {
        const newSet = {
            ...set,
            cards: set.cards.map(card => {
                if (card.id === cardId) {
                    card.score ??= 0;

                    card.score = card.score + 1 > 10 ? 10 : card.score + 1
                }

                return card;
            })
        };

        await this.upsertSet(newSet);

        return newSet;
    }

    /**
     * Decreases the score of a card in a set
     * 
     * @param {StudySet} set The set to update
     * @param {Number} cardId The id of the card to update
     */
    async decreaseCardScore(set, cardId) {
        const newSet = {
            ...set,
            cards: set.cards.map(card => {
                if (card.id === cardId) {
                    card.score ??= 0;

                    card.score = card.score - 1 < -10 ? -10 : card.score - 1
                }

                return card;
            })
        };

        await this.upsertSet(newSet);

        return newSet;
    }

    /**
     * Loads a set given the set itself or the hash of the set. If the set is valid,
     * it is returned. If the set is not valid, but the hash is, the set is loaded
     * from storage and returned. If neither the set nor the hash are valid, the
     * user is navigated to the home page with an error message. If the user isn't signed in,
     * it returns undefined
     * 
     * @param {StudySet} set The set or hash of the set to load
     * @param {String} hash The hash of the set to load
     * @returns {Promise<StudySet>} A promise that resolves to the loaded set
     */
    async loadSet(set, hash) {
        if (SetManager.isValidSet(set)) {
            return set;
        }

        if (!this.ssxManager.hasSession()) {
            return null;
        }

        const completeSet = await this.getCompleteSet(hash);
        if (SetManager.isValidSet(completeSet)) {
            return completeSet;
        }

        this.navigator.navigateHome({ error: 'Set not found' });
    }
}

export default SetManager;
