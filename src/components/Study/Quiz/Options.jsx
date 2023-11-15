import { useState } from "react"

import QuizManager from "../../../utils/Managers/QuizManager";

function Options({ options, setOptions, setOpenOptions, size }) {
    const [tempOptions, setTempOptions] = useState(options);

    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black/50">
            <div className="max-w-[500px] w-1/2 min-h-[75%] border-white border rounded-lg bg-primary-background p-4 flex flex-col justify-between">
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="w-1/3 flex items-center justify-start"></div>
                        <div className="w-1/3 flex items-center justify-center">
                            <h2>Options</h2>
                        </div>
                        <div className="w-1/3 flex items-center justify-end">
                            <button
                                className="bg-secondary-button px-2 py-2 rounded-lg hover:bg-secondary-button/75"
                                onClick={() => setOpenOptions(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <form>
                        <div>
                            <div>
                                Question Types
                            </div>
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.MULTIPLE_CHOICE}
                                        name='types'
                                        value={QuizManager.MULTIPLE_CHOICE}
                                        defaultChecked={tempOptions.types.includes(QuizManager.MULTIPLE_CHOICE)}
                                    />
                                    <label htmlFor={QuizManager.MULTIPLE_CHOICE}>Multiple Choice</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.TRUE_FALSE}
                                        name='types'
                                        value={QuizManager.TRUE_FALSE}
                                        defaultChecked={tempOptions.types.includes(QuizManager.TRUE_FALSE)}
                                    />
                                    <label htmlFor={QuizManager.TRUE_FALSE}>True/False</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.MATCHING}
                                        name='types'
                                        value={QuizManager.MATCHING}
                                        defaultChecked={tempOptions.types.includes(QuizManager.MATCHING)}
                                    />
                                    <label htmlFor={QuizManager.MATCHING}>Matching</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.SHORT_ANSWER}
                                        name='types'
                                        value={QuizManager.SHORT_ANSWER}
                                        defaultChecked={tempOptions.types.includes(QuizManager.SHORT_ANSWER)}
                                    />
                                    <label htmlFor={QuizManager.SHORT_ANSWER}>Short Answer</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                Ask
                            </div>
                            <div>
                                <div>
                                    <input
                                        type="radio"
                                        id={QuizManager.BOTH}
                                        name="ask"
                                        value={QuizManager.BOTH}
                                        defaultChecked={tempOptions.ask === QuizManager.BOTH}
                                    />
                                    <label htmlFor={QuizManager.BOTH}>Both</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={QuizManager.DEFINITION}
                                        name="ask"
                                        value={QuizManager.DEFINITION}
                                        defaultChecked={tempOptions.ask === QuizManager.DEFINITION}
                                    />
                                    <label htmlFor={QuizManager.DEFINITION}>Definitions</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={QuizManager.TERM}
                                        name="ask"
                                        value={QuizManager.TERM}
                                        defaultChecked={tempOptions.ask === QuizManager.TERM}
                                    />
                                    <label htmlFor={QuizManager.TERM}>Terms</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                Number of Questions
                            </div>
                            <div>
                                <input
                                    type="number"
                                    id="number"
                                    name="number"
                                    min={1}
                                    max={size}
                                    defaultValue={tempOptions.number}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    className="w-full bg-primary-button px-2 py-4 rounded-lg hover:bg-primary-button/75"
                >
                    Update Options
                </button>
            </div>
        </div>
    )
}

export default Options
