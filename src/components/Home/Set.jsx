import { Link } from "react-router-dom";

import { drugHippos } from "../../utils/tools";

function Set({ setKey, set }) {
    const maxRedAccuracy = 60;
    const maxYellowAccuracy = 85;
    const accuracyColor = set.accuracy >= maxYellowAccuracy ? 'text-[#00FF00]' : set.accuracy >= maxRedAccuracy ? 'text-[#FFFF00]' : 'text-[#FF0000]';

    return (
        <div className="w-full flex justify-center items-center">
            <Link key={setKey} className="w-[90%] h-1/4 h-full" to={`/sets/${set.hash}`} state={{ partialSet: set }}>
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
    )
}

export default Set;
