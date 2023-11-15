/**
 * @typedef {Object} Card
 * 
 * @property {String} term The term of the card
 * @property {String} definition The definition of the card
 * @property {Number?} score The number of times the card has been answered correctly
 * @property {Number} id The id of the card
 */

/**
 * @typedef {Object} KeplerGenericSet
 * 
 * @property {String} title The title of the set
 * @property {String} hash The hash of the set to use for specific set data
 * @property {Number} size The number of cards in the set
 * @property {Number} accuracy A whole number that represents the percentage of terms memorized
 */

/**
 * @typedef {Object} KeplerSet
 * 
 * @property {String} definition The definition of the set
 * @property {Card[]} cards The cards in the set
 */

/**
 * @typedef {Object} StudySet The set object created and used by StudyBee
 * 
 * @property {String} title The title of the set
 * @property {String} definition The definition of the set
 * @property {Card[]} cards The cards in the set
 * @property {String?} hash The hash of the set to use for specific set data
 */