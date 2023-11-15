import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSSX } from "@spruceid/ssx-react";

import SetManager from "../../../utils/SetManager";

function Flashcards({ set, setDone }) {
    const [learning, setLearning] = useState(0);
    const [known, setKnown] = useState(0);
    const [display, setDisplay] = useState('term');
    const [currentTerm, setCurrentTerm] = useState(0);
    const { ssx } = useSSX();

    const setManager = new SetManager(ssx);

    const { cards } = set;

    const setCurrentTermSafe = (index) => {
        if (index < cards.length + 1 && index >= 0) {
            setCurrentTerm(index);
        }
    }

    useEffect(() => {
        if (currentTerm === cards.length) {
            setDone(true);
        }
    }, [currentTerm, cards.length, setDone]);

    const increaseLearning = () => {
        if (learning + known < cards.length) {

            cards[currentTerm].score = cards[currentTerm].score || 0;
            cards[currentTerm].score -= 1;
            if (cards[currentTerm].score < -10) {
                cards[currentTerm].score = -10;
            }
            setLearning(learning + 1);
            setDisplay('term');
        }

        setCurrentTermSafe(currentTerm + 1);
    }

    const increaseKnown = () => {
        if (learning + known < cards.length) {

            cards[currentTerm].score = cards[currentTerm].score || 0;
            cards[currentTerm].score += 1;
            if (cards[currentTerm].score > 10) {
                cards[currentTerm].score = 10;
            }

            setKnown(known + 1);
            setDisplay('term');
        }

        setCurrentTermSafe(currentTerm + 1);
    }

    const flipCard = () => {
        if (display === 'term') {
            setDisplay('definition');
        } else {
            setDisplay('term');
        }
    };

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center">
            <div className="flex justify-between items-center w-full text-xl">
                <div className="w-1/3 flex justify-start items-center">

                    <h1 className="text-2xl">Flashcards</h1>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                    <p>{currentTerm}/{cards.length}</p>
                </div>
                <div className="w-1/3 flex justify-end items-center">
                    <Link
                        className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-black/50"
                        to={`/sets/${set.hash}`}
                        state={{ set }}
                    >
                        Exit
                    </Link>
                </div>
            </div>
            {
                cards.length !== currentTerm ?
                    (
                        <div className="w-full flex flex-col items-center">
                            <div className="w-[90%] py-8">
                                <button className="w-full bg-secondary-background p-2 rounded-lg h-[50vh]" onClick={flipCard}>
                                    <div className="h-[90%] w-full flex justify-center items-center text-lg">{cards[currentTerm][display]}</div>
                                    <div className="h-[10%] w-full flex justify-center items-center">Click to flip</div>
                                </button>
                            </div>
                            <div className="w-[90%] flex justify-between">
                                <div className="flex items-center justify-between w-[45%]">
                                    <p className="text-xl"><span className="text-[#FF0000]">{learning}</span> Still Learning</p>
                                    <button
                                        className="p-2 text-lg text-[#FF0000] border-2 border-[#FF0000] rounded-full aspect-square w-[20%] hover:bg-black/50"
                                        onClick={increaseLearning}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="flex items-center justify-between w-[45%]">
                                    <button
                                        className="p-2 text-lg text-[#00FF00] border-2 border-[#00FF00] rounded-full aspect-square w-[20%] hover:bg-black/50"
                                        onClick={increaseKnown}
                                    >
                                        ✓
                                    </button>
                                    <p className="text-xl"><span className="text-[#00FF00]">{known}</span> Known</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="text-center py-8 text-xl">Results</div>
                            <div className="space-y-4">
                                Get rid of this
                            </div>
                        </div>
                    )
            }

        </div>
    );
}

export default Flashcards;
