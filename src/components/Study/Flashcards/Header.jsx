import { Link } from "react-router-dom"
import { useState } from "react"

import { drugHippos } from "../../../utils/tools";
import Options from "./Options";
import SetManager from "../../../utils/SetManager";

function Header({ cardInx, set }) {
    const [openOptions, setOpenOptions] = useState(false);
    const size = SetManager.getSetSize(set);

    const closeOptionsMenu = () => {
        setOpenOptions(false);
    }

    const openOptionsMenu = () => {
        setOpenOptions(true);
    }

    return (
        <div className="flex justify-between items-center w-full text-xl">
            <div className="w-1/3 flex justify-start items-center">

                <h1 className="text-2xl">Flashcards</h1>
            </div>
            <div className="w-1/3 flex justify-center items-center">
                <p>{cardInx}/{size}</p>
            </div>
            <div className="w-1/3 flex justify-end items-center">
                <button
                    className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-white/25 mr-4"
                    onClick={openOptionsMenu}
                >
                    Options
                </button>
                <Link
                    className="py-2 px-4 border-2 border-secondary-background rounded-lg hover:bg-black/50 ml-4"
                    to={`/sets/${set.hash}`}
                    state={{ set }}
                >
                    Exit
                </Link>
            </div>
            {drugHippos(<Options close={closeOptionsMenu} />, openOptions)}
        </div>
    )
}

export default Header
