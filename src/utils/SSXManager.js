/**
 * A class that manages an SSX instance
 */
class SSXManager {
    /**
     * Creates a new SSXManager
     * 
     * @param {import("@spruceid/ssx").SSX} ssx The SSX instance to use
     */
    constructor(ssx) {
        this.ssx = ssx;
    }

    /**
     * Checks if there is an active session
     * 
     * @returns {Boolean} Whether or not there is an active session
     */
    hasSession() {
        return this.ssx?.session() ? true : false;
    }
};

export default SSXManager;
