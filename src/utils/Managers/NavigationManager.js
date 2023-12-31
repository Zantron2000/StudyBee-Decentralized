class NavigationManager {

    /**
     * Creates a new navigation manager
     * 
     * @param {import("react-router-dom").NavigateFunction} navigator The navigator function to use
     */
    constructor(navigator) {
        this.navigator = navigator;
    }

    navigateHome(state) {
        this.navigator('/', { state });
    };

    navigateSearch(search, state) {
        this.navigator(`/?search=${search}`, { state });
    }

    navigateSetHome(hash, state) {
        this.navigator(`/sets/${hash}`, { state });
    };

    navigateSetLearn(hash, state) {
        this.navigator(`/sets/${hash}/learn`, { state });
    };

    navigateSetFlashcards(hash, state) {
        this.navigator(`/sets/${hash}/flashcards`, { state });
    };

    navigateSetEdit(hash, state) {
        this.navigator(`/sets/${hash}/edit`, { state });
    };
}

export default NavigationManager;
