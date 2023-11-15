import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Options from "./Options";

function Header({ set, options, setOptions }) {
    console.log(set, options, setOptions)
    const { setHash } = useParams();
    const [openOptions, setOpenOptions] = useState(false);

    return (
        <div className="flex justify-between items-center w-full text-xl">
            <div className="w-1/3"><h1 className="text-xl">Learn</h1></div>
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
            {openOptions ? <Options options={options} setOptions={setOptions} setOpenOptions={setOpenOptions} size={set.cards.length} /> : null}
        </div>
    )
}

export default Header
