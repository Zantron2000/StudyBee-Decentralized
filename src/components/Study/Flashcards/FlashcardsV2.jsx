import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSSX } from "@spruceid/ssx-react";

import SetManager from "../../../utils/SetManager";
import Header from "./Header";
import FlashCardManager from "../../../utils/Managers/Study/FlashcardManager";

function Flashcards({ set, setDone }) {
    const [learning, setLearning] = useState(0);
    const [known, setKnown] = useState(0);
    const [display, setDisplay] = useState('term');
    const [cardIdx, setCardIdx] = useState(0);
    const [options, setOptions] = useState(FlashCardManager.DEFAULT_OPTIONS);
    const [order, setOrder] = useState([]);
    const { ssx } = useSSX();
    const setManager = new SetManager(ssx);
    const flashcardManager = new FlashCardManager(learning, setLearning, known, setKnown, cardIdx, setCardIdx, setManager, set, display, setDisplay, options, order, setOrder);

    useEffect(() => {
        flashcardManager.initialize();
    }, [options]);

    useEffect(() => {
        if (cardIdx === SetManager.getSetSize(set)) {
            setDone(true);
        }
    }, [cardIdx, SetManager.getSetSize(set), setDone]);

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center">
            <Header cardInx={cardIdx} set={set} options={options} setOptions={setOptions} />
            <div className="w-full flex flex-col items-center">
                <div className="w-[90%] py-8">
                    <button className="w-full bg-secondary-background p-2 rounded-lg h-[50vh]" onClick={() => flashcardManager.flipCard()}>
                        <div className="h-[90%] w-full flex justify-center items-center text-lg">{flashcardManager.getDisplay()}</div>
                        <div className="h-[10%] w-full flex justify-center items-center">Click to flip</div>
                    </button>
                </div>
                <div className="w-[90%] flex justify-between">
                    <div className="flex items-center justify-between w-[45%]">
                        <p className="text-xl"><span className="text-[#FF0000]">{learning}</span> Still Learning</p>
                        <button
                            className="p-2 text-lg text-[#FF0000] border-2 border-[#FF0000] rounded-full aspect-square w-[20%] hover:bg-black/50"
                            onClick={() => flashcardManager.increaseLearning()}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex items-center justify-between w-[45%]">
                        <button
                            className="p-2 text-lg text-[#00FF00] border-2 border-[#00FF00] rounded-full aspect-square w-[20%] hover:bg-black/50"
                            onClick={() => flashcardManager.increaseKnown()}
                        >
                            ✓
                        </button>
                        <p className="text-xl"><span className="text-[#00FF00]">{known}</span> Known</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcards;
