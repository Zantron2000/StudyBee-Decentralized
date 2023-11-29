import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";
import { Link, useSearchParams } from "react-router-dom";

import SetManager from '../../utils/SetManager';
import SSXManager from '../../utils/SSXManager';
import { drugHippos } from "../../utils/tools";
import Set from "./Set";
import SearchResults from "./SearchResults";

function Sets() {
    const [sets, setSets] = useState([]);
    const { ssx } = useSSX();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
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
    }, [ssxManager.hasSession()]);

    const setCards = sets.map((set, index) => {
        return <Set set={set} setKey={'set-' + index} />
    })

    return (
        <div className="min-h-[60vh] w-[90%] max-w-[1296px] mx-auto py-8">
            <div>
                <div className="flex justify-between items-center text-xl">
                    <p>{search ? 'Search Results' : 'Your Sets'}</p>
                    <Link
                        className="px-8 py-2 bg-primary-button rounded-full"
                        to="/create"
                    >
                        Create Set
                    </Link>
                </div>
                {
                    drugHippos(<SearchResults sets={sets} search={search} />, search, setCards.length)
                }
                {
                    drugHippos(
                        <div className="flex justify-between text-xl">
                            <p>All Sets</p>
                        </div>,
                        search,
                        setCards.length
                    )
                }
                <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap">
                    {setCards.length ? setCards : <div className="w-full h-[30vh] text-xl flex justify-center items-center"><p>You have no sets</p></div>}
                </div>
            </div>
        </div>
    );
}

export default Sets;
