import { useState } from "react"

import QuizManager from "../../../utils/Managers/QuizManager";

function Options({ options, setOptions, setOpenOptions, size }) {
    const [tempOptions, setTempOptions] = useState(options);
    const [visability, setVisability] = useState({
        types: 'invisible',
        size: 'invisible'
    });

    const updateOptions = (event) => {
        event.preventDefault();
        let valid = true;
        const tempVisability = { ...visability };
        const { types, size } = tempOptions;

        if (types.length === 0) {
            tempVisability.types = 'visible';
            valid = false;
        } else {
            tempVisability.types = 'invisible';
        }
        if (size < 1 || size > size) {
            tempVisability.size = 'visible';
            valid = false;
        } else {
            tempVisability.size = 'invisible';
        }

        if (valid) {
            setOptions(tempOptions);
            setOpenOptions(false);
        } else {
            setVisability(tempVisability);
        }
    }

    const changeTypes = (event) => {
        const { value, checked } = event.target;
        const { types } = tempOptions;

        if (checked) {
            const typesSet = new Set([...types, value]);

            setTempOptions({
                ...tempOptions,
                types: [...typesSet]
            });
        } else {
            const newTypes = types.filter(type => type !== value);
            setTempOptions({
                ...tempOptions,
                types: newTypes
            });
        }
    };

    const changeAsk = (event) => {
        const { value } = event.target;

        setTempOptions({
            ...tempOptions,
            ask: value
        });
    };

    const changeSize = (event) => {
        const { value } = event.target;

        if (1 <= value && value <= size) {
            setTempOptions({
                ...tempOptions,
                size: value
            });
        }
    };

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
                        <div className="border-b">
                            <div className="py-2 text-xl">
                                Question Types
                            </div>
                            <div className="py-2 space-y-2 text-lg px-4">
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.MULTIPLE_CHOICE}
                                        name='types'
                                        value={QuizManager.MULTIPLE_CHOICE}
                                        checked={tempOptions.types.includes(QuizManager.MULTIPLE_CHOICE)}
                                        className='mx-2'
                                        onChange={changeTypes}
                                    />
                                    <label htmlFor={QuizManager.MULTIPLE_CHOICE}>Multiple Choice</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.TRUE_FALSE}
                                        name='types'
                                        value={QuizManager.TRUE_FALSE}
                                        checked={tempOptions.types.includes(QuizManager.TRUE_FALSE)}
                                        className='mx-2'
                                        onChange={changeTypes}
                                    />
                                    <label htmlFor={QuizManager.TRUE_FALSE}>True/False</label>
                                </div>
                                {/* <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.MATCHING}
                                        name='types'
                                        value={QuizManager.MATCHING}
                                        checked={tempOptions.types.includes(QuizManager.MATCHING)}
                                        className='mx-2'
                                        onChange={changeTypes}
                                    />
                                    <label htmlFor={QuizManager.MATCHING}>Matching</label>
                                </div> */}
                                <div>
                                    <input
                                        type="checkbox"
                                        id={QuizManager.SHORT_ANSWER}
                                        name='types'
                                        value={QuizManager.SHORT_ANSWER}
                                        checked={tempOptions.types.includes(QuizManager.SHORT_ANSWER)}
                                        className='mx-2'
                                        onChange={changeTypes}
                                    />
                                    <label htmlFor={QuizManager.SHORT_ANSWER}>Short Answer</label>
                                </div>
                                <div className={`text-[#ff0000] ${visability.types}`}>At least one option needs to be selected</div>
                            </div>
                        </div>
                        <div className="border-b">
                            <div className="py-2 text-xl">
                                Ask
                            </div>
                            <div className="py-2 space-y-2 text-lg px-4">
                                <div>
                                    <input
                                        type="radio"
                                        id={QuizManager.BOTH}
                                        name="ask"
                                        value={QuizManager.BOTH}
                                        defaultChecked={tempOptions.ask === QuizManager.BOTH}
                                        className='mx-2'
                                        onChange={changeAsk}
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
                                        className='mx-2'
                                        onChange={changeAsk}
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
                                        className='mx-2'
                                        onChange={changeAsk}
                                    />
                                    <label htmlFor={QuizManager.TERM}>Terms</label>
                                </div>
                            </div>
                        </div>
                        <div className="border-b">
                            <div className="py-2 text-xl">
                                Number of Questions
                            </div>
                            <div className="py-2 space-y-2 text-lg px-4">
                                <input
                                    type="number"
                                    id="number"
                                    name="number"
                                    min={1}
                                    max={size}
                                    value={tempOptions.size}
                                    className="bg-input-background w-full text-white p-2 text-center rounded-lg text-2xl"
                                    onChange={changeSize}
                                />
                                <div className={`text-[#ff0000] ${visability.size}`}>Needs to be between 1 and {size}</div>
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    className="w-full bg-primary-button px-2 py-4 rounded-lg hover:bg-primary-button/75"
                    onClick={updateOptions}
                >
                    Update Options
                </button>
            </div>
        </div>
    )
}

export default Options
