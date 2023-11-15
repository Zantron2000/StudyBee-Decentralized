import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSSX } from "@spruceid/ssx-react";

import StatusCard from "./StatusCard";
import SetManager from "../utils/SetManager";

function Flashcards() {
    const navigate = useNavigate();
    const [set, setSet] = useState(useLocation()?.state.set);
    const [learning, setLearning] = useState(0);
    const [known, setKnown] = useState(0);
    const [display, setDisplay] = useState('term');
    const [currentTerm, setCurrentTerm] = useState(0);
    const { ssx } = useSSX();

    const setManager = new SetManager(ssx);

    if (!set) {
        navigate('/');
    }

    const cards = set.cards || [];

    const setCurrentTermSafe = (index) => {
        if (index < cards.length + 1 && index >= 0) {
            setCurrentTerm(index);
        }
    }

    const increaseLearning = () => {
        if (learning + known < cards.length) {
            const newCards = [...cards];

            newCards[currentTerm].score = newCards[currentTerm].score || 0;
            newCards[currentTerm].score -= 1;
            if (newCards[currentTerm].score < -10) {
                newCards[currentTerm].score = -10;
            }

            setSet({ ...set, cards: newCards });
            setLearning(learning + 1);
            setDisplay('term');
        }

        setCurrentTermSafe(currentTerm + 1);
    }

    const increaseKnown = () => {
        if (learning + known < cards.length) {
            const newCards = [...cards];

            newCards[currentTerm].score = newCards[currentTerm].score || 0;
            newCards[currentTerm].score += 1;
            if (newCards[currentTerm].score > 10) {
                newCards[currentTerm].score = 10;
            }

            setSet({ ...set, cards: newCards });
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

    const displayResults = () => {
        const sortedTerms = [...cards].sort((a, b) => b.score - a.score);
        const results = [];

        for (let i = 0; i < sortedTerms.length; i++) {
            results.push(
                <StatusCard
                    term={sortedTerms[i].term}
                    definition={sortedTerms[i].definition}
                    score={sortedTerms[i].score}
                />
            );
        }

        setManager.updateSet(set.hash, set);
        return results;
    }

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl">Flashcards</h1>
                <p>{currentTerm}/{cards.length}</p>
                <Link
                    className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-black/50"
                    to={`/sets/${set.hash}`}
                    state={{ set }}
                >
                    Exit
                </Link>
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
                                    <p className="text-lg"><span className="text-[#FF0000]">{learning}</span> Still Learning</p>
                                    <button
                                        className="p-2 text-xl text-[#FF0000] border-2 border-[#FF0000] rounded-full aspect-square w-[20%] hover:bg-black/50"
                                        onClick={increaseLearning}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="flex items-center justify-between w-[45%]">
                                    <button
                                        className="p-2 text-xl text-[#00FF00] border-2 border-[#00FF00] rounded-full aspect-square w-[20%] hover:bg-black/50"
                                        onClick={increaseKnown}
                                    >
                                        ✓
                                    </button>
                                    <p className="text-lg"><span className="text-[#00FF00]">{known}</span> Known</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="text-center py-8 text-xl">Results</div>
                            <div className="space-y-4">
                                {...displayResults()}
                            </div>
                        </div>
                    )
            }

        </div>
    );
}

export default Flashcards;
