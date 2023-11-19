import { useState } from "react";

import QuizManager from "../../../utils/Managers/QuizManager";
import { capitalize } from "../../../utils/tools";

function ShortAnswer({ question, manager }) {
    const { ask, card, answer } = question;
    const provided = QuizManager.getProvided(ask);

    const updateAnswer = (e) => {
        manager.updateAnswer(e.target.value);
    };

    return (
        <div className="w-full">
            <div className="w-full bg-secondary-background p-4 rounded-lg min-h-[40vh]">
                <div className="pb-8 min-h-[20vh]">
                    <p className="text-gray-300">{capitalize(provided)}</p>
                    <p className="text-xl">{card[provided]}</p>
                </div>
                <div>
                    <div className="py-2">
                        <div className="w-full flex justify-between">
                            <label
                                className={`py-2 text-white/50`}
                                htmlFor="answer"
                            >
                                Your answer
                            </label>
                        </div>
                        <div className="w-full flex flex-col py-2">
                            <textarea
                                type="input"
                                id="answer"
                                placeholder="Type the answer"
                                className={`py-2 px-4 rounded-lg border text-lg bg-input-background border-white/0 resize-none`}
                                value={answer}
                                onChange={updateAnswer}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShortAnswer;
