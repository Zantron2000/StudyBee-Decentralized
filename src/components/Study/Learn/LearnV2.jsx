import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useSSX } from '@spruceid/ssx-react'

import SetManager from "../../../utils/SetManager";
import LearnManager from "../../../utils/Managers/LearnManager";
import LearnOptions from "./LearnOptions";
import QuestionBox from "./QuestionBox";
import RoundResults from "./RoundResults";

function Learn({ set, setDone }) {
    const { setHash } = useParams();
    const { ssx } = useSSX();
    const setManager = new SetManager(ssx);
    const cards = set.cards;
    const [openOptions, setOpenOptions] = useState(false);
    const [tiers, setTiers] = useState([]);
    const [options, setOptions] = useState({ type: LearnManager.BOTH, ask: LearnManager.BOTH });
    const [roundNumber, setRoundNumber] = useState(0);
    const [roundCards, setRoundCards] = useState([]);
    const learnManager = new LearnManager(tiers, setTiers, options);
    const [showRoundResults, setShowRoundResults] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);

    const resetLearn = () => {
        const tempTiers = LearnManager.configureTiers(options);
        tempTiers[0].push(...cards.map(card => ({ ...card, learn: undefined })));
        const tempLearnManager = new LearnManager(tempTiers, setTiers, options);
        const initRoundCards = tempLearnManager.getRound()

        setQuestionNumber(0);
        setRoundNumber(1);
        setTiers(tempTiers);
        setShowRoundResults(false);
        setRoundCards(initRoundCards);
    }

    useEffect(() => {
        resetLearn();
    }, [options])

    useEffect(() => {
        setRoundCards(learnManager.getRound());

        if (learnManager.getTotalProgressCards() === 0 && tiers.length > 0) {
            setDone(true)
        }
    }, [roundNumber]);

    useEffect(() => {
        setRoundNumber(1);
    }, []);

    const activateNextRound = (event) => {
        event.preventDefault();

        setShowRoundResults(false);
        setRoundNumber(roundNumber + 1);
        if (learnManager.getTotalProgressCards() === 0 && tiers.length > 0) {
            setDone(true)
        }
    }

    const finishRound = (event) => {
        event.preventDefault();

        setShowRoundResults(true);
    }

    const increaseScore = (id) => {
        setManager.increaseCardScore({ ...set, hash: setHash }, id);
    }

    const decreaseScore = (id) => {
        setManager.decreaseCardScore({ ...set, hash: setHash }, id);
    }

    return (
        <>

            <div className={`w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center ${openOptions ? 'overflow-hidden' : ''}`}>
                <div className="flex justify-between items-center w-full text-xl">
                    <div className="w-1/3"><h1 className="text-xl">Learn</h1></div>
                    <div className="w-1/3 flex justify-center"><p>Round {roundNumber}</p></div>
                    <div className="flex justify-around w-1/3">
                        <button
                            className="py-1 px-4 border-2 border-secondary-background rounded-lg hover:bg-white/25"
                            onClick={() => setOpenOptions(true)}
                        >
                            Options
                        </button>
                        <Link
                            className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-white/25"
                            to={`/sets/${setHash}`}
                            state={{ set }}
                        >
                            Exit
                        </Link>
                    </div>
                </div>

                {roundCards.length && !showRoundResults ?
                    <QuestionBox
                        key={roundCards}
                        manager={learnManager}
                        roundCards={roundCards}
                        finishRound={finishRound}
                        increaseScore={increaseScore}
                        decreaseScore={decreaseScore}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                    />
                    : showRoundResults ?
                        <RoundResults
                            key={roundNumber}
                            manager={learnManager}
                            activateNextRound={activateNextRound}
                        />
                        : null
                }

            </div>

            <LearnOptions
                key={openOptions}
                options={options} setOptions={setOptions}
                openMenu={openOptions} setOpenMenu={setOpenOptions}
            />
        </>
    )
}

export default Learn;
