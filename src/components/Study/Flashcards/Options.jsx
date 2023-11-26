import { useState } from "react";

import FlashCardManager from "../../../utils/Managers/Study/FlashcardManager"

function Options({ close, setOptions, options }) {
    const [tempOptions, setTempOptions] = useState(options);

    const changeDisplay = (e) => {
        setTempOptions({
            ...tempOptions,
            display: e.target.value
        });
    }

    const changeOrder = (e) => {
        setTempOptions({
            ...tempOptions,
            order: e.target.value
        });
    }

    const updateOptions = (e) => {
        e.preventDefault();

        setOptions(tempOptions);
        close();
    }

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
                                onClick={close}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <form>
                        <div className="border-b">
                            <div className="py-2 text-xl">
                                Show
                            </div>
                            <div className="py-2 space-y-2 text-lg px-4">
                                <div>
                                    <input
                                        type="radio"
                                        id={FlashCardManager.TERM}
                                        name="display"
                                        value={FlashCardManager.TERM}
                                        defaultChecked={tempOptions.display === FlashCardManager.TERM}
                                        className='mx-2'
                                        onChange={changeDisplay}
                                    />
                                    <label htmlFor={FlashCardManager.TERM}>Term</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={FlashCardManager.DEFINITION}
                                        name="display"
                                        value={FlashCardManager.DEFINITION}
                                        defaultChecked={tempOptions.ask === FlashCardManager.DEFINITION}
                                        className='mx-2'
                                        onChange={changeDisplay}
                                    />
                                    <label htmlFor={FlashCardManager.DEFINITION}>Definition</label>
                                </div>
                            </div>
                        </div>
                        <div className="border-b">
                            <div className="py-2 text-xl">
                                Order
                            </div>
                            <div className="py-2 space-y-2 text-lg px-4">
                                <div>
                                    <input
                                        type="radio"
                                        id={FlashCardManager.IN_ORDER}
                                        name="order"
                                        value={FlashCardManager.IN_ORDER}
                                        defaultChecked={tempOptions.order === FlashCardManager.IN_ORDER}
                                        className='mx-2'
                                        onChange={changeOrder}
                                    />
                                    <label htmlFor={FlashCardManager.IN_ORDER}>In Order</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={FlashCardManager.RANDOM}
                                        name="order"
                                        value={FlashCardManager.RANDOM}
                                        defaultChecked={tempOptions.order === FlashCardManager.RANDOM}
                                        className='mx-2'
                                        onChange={changeOrder}
                                    />
                                    <label htmlFor={FlashCardManager.RANDOM}>Random</label>
                                </div>
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
