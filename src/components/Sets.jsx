import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";
import { Link } from "react-router-dom";

import SetManager from '../utils/SetManager';
import SSXManager from '../utils/SSXManager';
import { drugHippos } from "../utils/tools";

const maxRedAccuracy = 60;
const maxYellowAccuracy = 85;

function Sets() {
    const [sets, setSets] = useState([]);
    const { ssx } = useSSX();

    const setManager = new SetManager(ssx);
    const ssxManager = new SSXManager(ssx);

    useEffect(() => {
        async function getSets() {
            const sets = await setManager.getSets();
            setSets(sets);
        }

        if (ssxManager.hasSession()) {
            getSets();
        } else {
            setSets([]);
        }
    }, []);

    const setCards = sets.map((set, index) => {
        const accuracyColor = set.accuracy >= maxYellowAccuracy ? 'text-[#00FF00]' : set.accuracy >= maxRedAccuracy ? 'text-[#FFFF00]' : 'text-[#FF0000]';

        return <div className="w-full flex justify-center items-center">
            <Link key={index} className="w-[90%] h-1/4 h-full" to={`/sets/${set.hash}`} state={{ partialSet: set }}>
                <div className="flex bg-[#292A2D] flex-col p-4 rounded-lg text-lg my-4">
                    <div className="mb-8">
                        <p>{set.title}</p>
                    </div>
                    <div className="flex flex-row justify-between mt-8">
                        <div className="p-2 bg-[#D9D9D9] rounded-full text-black">
                            {set.size} Terms
                        </div>
                        {drugHippos(
                            <div className="p-2 bg-[#3C4470] rounded-full">
                                <span className={accuracyColor}>{set.accuracy}%</span> Accuracy
                            </div>,
                            set.accuracy !== undefined
                        )}
                    </div>
                </div>
            </Link>
        </div>
    })

    return (
        <div className="min-h-[60vh] w-[90%] max-w-[1296px] mx-auto py-8">
            <div>
                <div className="flex justify-between text-lg">
                    <p>Your Sets</p>
                    <Link
                        className="px-8 py-2 bg-primary-button rounded-full"
                        to="/create"
                    >
                        Create Set
                    </Link>
                </div>
                <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap">
                    {setCards.length ? setCards : <div className="w-full h-[30vh] text-xl flex justify-center items-center"><p>You have no sets</p></div>}
                </div>
            </div>
        </div>
    );
}

export default Sets;
