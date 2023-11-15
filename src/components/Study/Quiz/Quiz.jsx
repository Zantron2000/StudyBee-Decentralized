import { useState } from "react";

import QuizManager from "../../../utils/Managers/QuizManager";
import Header from "./Header";

function Quiz({ set }) {
    const [options, setOptions] = useState(QuizManager.getDefaultOptions(set));

    console.log(options)

    return (
        <div className={`w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center`}>
            <Header set={set} options={options} setOptions={setOptions} />
        </div>
    );
}

export default Quiz;
