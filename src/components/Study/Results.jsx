import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import StatusCard from "./StatusCard";

function Results({ set }) {
    const { setHash } = useParams();
    set.hash = setHash;

    const displayResults = () => {
        const redCards = set.cards.filter((card) => card?.score && card.score < 0);
        const yellowCards = set.cards.filter((card) => card?.score && card.score >= 0 && card.score < 5);
        const greenCards = set.cards.filter((card) => card?.score && card.score >= 5);
        const scorelessCards = set.cards.filter((card) => !card?.score);

        return (
            <div>
                {
                    greenCards.length ?
                        <div className="space-y-4 py-2">
                            <div className="text-lg">Queen Bee</div>
                            {
                                greenCards.map((card) => (
                                    <StatusCard
                                        term={card.term}
                                        definition={card.definition}
                                        score={card.score}
                                    />
                                ))
                            }
                        </div> : null
                }
                {
                    yellowCards.length ?
                        <div className="space-y-4 py-2">
                            <div className="text-lg">Working Bee</div>
                            {
                                yellowCards.map((card) => (
                                    <StatusCard
                                        term={card.term}
                                        definition={card.definition}
                                        score={card.score}
                                    />
                                ))
                            }
                        </div> : null
                }
                {
                    redCards.length ?
                        <div className="space-y-4 py-2">
                            <div className="text-lg">Drone Bee</div>
                            {
                                redCards.map((card) => (
                                    <StatusCard
                                        term={card.term}
                                        definition={card.definition}
                                        score={card.score}
                                    />
                                ))
                            }
                        </div> : null
                }
                {
                    scorelessCards.length ?
                        <div className="space-y-4 py-2">
                            <div className="text-lg">Out of the Hive</div>
                            {
                                scorelessCards.map((card) => (
                                    <StatusCard
                                        term={card.term}
                                        definition={card.definition}
                                        score={card.score}
                                    />
                                ))
                            }
                        </div> : null
                }
            </div>
        )
    }

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center pb-8">
            <div className="flex justify-between items-center w-full mb-8">
                <h1 className="text-xl">Results</h1>
                <Link
                    className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-black/50"
                    to={`/sets/${set.hash}`}
                    state={{ set }}
                >
                    Exit
                </Link>
            </div>
            <div className="w-full">
                <div className="space-y-4">
                    {displayResults()}
                </div>
            </div>
        </div>
    );
}

export default Results
