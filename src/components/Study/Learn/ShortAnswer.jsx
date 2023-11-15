import { useState } from "react";

import LearnManager from "../../../utils/Managers/LearnManager";

function ShortAnswer({ card, setCorrect, overrideAnswer, ask }) {
    const [answer, setAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [unknown, setUnknown] = useState(false);
    const provided = ask === LearnManager.TERM ? LearnManager.DEFINITION : LearnManager.TERM;

    const isCorrect = answer === card[ask]
    const label = submitted ? (isCorrect ? 'Correct' : unknown ? 'Skipped' : 'Incorrect') : 'Your answer';
    const labelColor = submitted && !unknown ? (isCorrect ? 'text-green-500' : 'text-red-500') : 'text-white/50';
    const inputColor = submitted && !unknown ? (isCorrect ? 'bg-green-500' : 'border-[#ff0000] bg-input-background') : 'bg-input-background border-white/0';

    const updateAnswer = (e) => {
        setAnswer(e.target.value);
    }

    const answerQuestion = (e) => {
        e.preventDefault();

        if (answer.trim() === '') {
            setUnknown(true);
        }

        setCorrect(isCorrect);
        setSubmitted(true);
    }

    const skipQuestion = (e) => {
        e.preventDefault();

        setCorrect(false);
        setUnknown(true);
        setSubmitted(true);
    }

    /**
     * In honor of my girlfriend
     */
    const drugHippos = (element, ...conditions) => {
        if (conditions.every(condition => condition)) {
            return element;
        }

        return null;
    }

    return (
        <div className="w-full">
            <div className="w-full bg-secondary-background p-4 rounded-lg min-h-[40vh]">
                <div className="pb-8 min-h-[20vh]">
                    <p className="text-gray-300">{provided.charAt(0).toUpperCase() + provided.slice(1)}</p>
                    <p className="text-xl">{card[provided.toLowerCase()]}</p>
                </div>
                <div>
                    <div className="py-2">
                        <div className="w-full flex justify-between">
                            <label
                                className={`py-2 ${labelColor}`}
                                htmlFor="answer"
                            >
                                {label}
                            </label>
                            {drugHippos(
                                <button className="text-white/100 hover:text-white/75 py-2" onClick={(event) => overrideAnswer(event)}>
                                    Override: I was correct
                                </button>,
                                submitted,
                                !unknown,
                                !isCorrect
                            )}
                        </div>
                        <form className="w-full" onSubmit={answerQuestion}>
                            <div className="w-full flex flex-col py-2">
                                <input
                                    type="input"
                                    id="answer"
                                    placeholder="Type the answer"
                                    className={`py-2 px-4 rounded-lg border text-lg ${inputColor}`}
                                    value={answer}
                                    onChange={updateAnswer}
                                    disabled={submitted}
                                    autoComplete="off"
                                />
                            </div>
                        </form>
                    </div>
                    <div className={`w-full flex justify-end items-center space-x-2 py-2 ${submitted ? 'hidden' : ''}`}>
                        <button
                            className="text-lg border border-white/0 py-2 px-4 rounded-lg hover:border-white"
                            onClick={skipQuestion}
                        >
                            Don't know?
                        </button>
                        <button
                            className="text-lg border border-white/0 bg-primary-button py-2 px-4 rounded-lg hover:bg-primary-button/75"
                            onClick={answerQuestion}
                        >
                            Answer
                        </button>
                    </div>
                    {
                        drugHippos(<div className="py-2">
                            <label
                                className={`py-2 text-white/50`}
                                htmlFor="correctAnswer"
                            >
                                Correct Answer
                            </label>
                            <div className="w-full flex flex-col py-2">
                                <input
                                    type="input"
                                    id="correctAnswer"
                                    className={`py-2 px-4 rounded-lg border text-lg bg-green-500`}
                                    value={card[ask]}
                                    disabled={true}
                                />
                            </div>
                        </div>, submitted, !isCorrect)
                    }
                </div>
            </div>
        </div>
    );
}

export default ShortAnswer;
