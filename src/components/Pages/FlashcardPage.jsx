import { useState } from 'react'

import FlashcardsV2 from '../Study/Flashcards/FlashcardsV2';
import Results from '../Study/Results';

function FlashcardPage({ set, setSet }) {
    const [done, setDone] = useState(false);

    return (
        <>
            {!done ? <FlashcardsV2 set={set} setDone={setDone} /> : <Results set={set} />}
        </>
    )
}

export default FlashcardPage
