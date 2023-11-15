import { useState } from "react"

import LearnManager from "../../../utils/Managers/LearnManager";
import Learn from "./LearnV2";

function LearnOptions({ options, setOptions, openMenu, setOpenMenu }) {
    const [tempOptions, setTempOptions] = useState(options);

    const updateOptions = (event) => {
        event.preventDefault();

        setOptions(tempOptions);
        setOpenMenu(false);
    }

    return (
        <div className={`${openMenu ? 'block' : 'hidden'} w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black/50`}>
            <div className="w-1/2 h-1/2 border-white border rounded-lg bg-primary-background p-4 flex flex-col justify-between">
                <div className="flex justify-between text-xl items-center">
                    <div className="w-1/3"></div>
                    <div className="w-1/3 flex justify-center">
                        <h2 className="py-1">Options</h2>
                    </div>
                    <div className="w-1/3 flex justify-end">
                        <button
                            className="py-1 px-4 border-2 border-secondary-background rounded-lg hover:bg-white/25"
                            onClick={() => setOpenMenu(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
                <form
                    className="py-4 text-lg"
                >
                    <div>
                        <div className="py-2">
                            Question Types
                        </div>
                        <div className="py-2 space-y-2">
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="type" id="both-type" value={LearnManager.BOTH}
                                    onClick={(event) => setTempOptions({ ...tempOptions, type: event.target.value })}
                                    defaultChecked={options.type === LearnManager.BOTH}
                                />
                                <label htmlFor="both-type">Both</label>
                            </div>
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="type" id="multiple-choice" value={LearnManager.MULTIPLE_CHOICE}
                                    onClick={(event) => setTempOptions({ ...tempOptions, type: event.target.value })}
                                    defaultChecked={options.type === LearnManager.MULTIPLE_CHOICE}
                                />
                                <label htmlFor="multiple-choice">Multiple Choice</label>
                            </div>
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="type" id="written" value={LearnManager.WRITTEN}
                                    onClick={(event) => setTempOptions({ ...tempOptions, type: event.target.value })}
                                    defaultChecked={options.type === LearnManager.WRITTEN}
                                />
                                <label htmlFor="written">Written</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="py-2">
                            Ask
                        </div>
                        <div className="py-2 space-y-2">
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="ask" id="both-ask" value={LearnManager.BOTH}
                                    onClick={(event) => setTempOptions({ ...tempOptions, ask: event.target.value })}
                                    defaultChecked={options.ask === LearnManager.BOTH}
                                />
                                <label htmlFor="both-ask">Both</label>
                            </div>
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="ask" id="term" value={LearnManager.TERM}
                                    onClick={(event) => setTempOptions({ ...tempOptions, ask: event.target.value })}
                                    defaultChecked={options.ask === LearnManager.TERM}
                                />
                                <label htmlFor="term">Terms</label>
                            </div>
                            <div className="px-2 space-x-4">
                                <input
                                    type="radio" name="ask" id="definition" value={LearnManager.DEFINITION}
                                    onClick={(event) => setTempOptions({ ...tempOptions, ask: event.target.value })}
                                    defaultChecked={options.ask === LearnManager.DEFINITION}
                                />
                                <label htmlFor="definition">Definitions</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="relative">
                    <button
                        className="bg-secondary-button w-full rounded-lg py-2 text-xl hover:bg-secondary-button/75"
                        onClick={updateOptions}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LearnOptions
