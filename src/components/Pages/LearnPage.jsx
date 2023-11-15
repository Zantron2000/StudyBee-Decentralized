import { useState } from 'react'

import Results from "../Study/Results";
import Learn2 from '../Study/Learn/LearnV2';

function LearnPage({ set, setSet }) {
    const [done, setDone] = useState(false);

    return (
        <>
            {!done ? <Learn2 set={set} setDone={setDone} /> : <Results set={set} />}
        </>
    )
}

export default LearnPage
