import Set from "./Set";

function SearchResults({ sets, search }) {
    const matchingSets = sets.filter(set => set.title.toLowerCase().includes(search.toLowerCase()));

    const setCards = matchingSets.map((set, index) => {
        return <Set set={set} setKey={'search-' + index} key={`search-${index}`} />
    })

    return (
        <div>
            {setCards.length ?
                <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap">
                    {setCards}
                </div>
                :
                <div className="w-full h-[30vh] text-xl flex justify-center items-center"><p>No matching results</p></div>
            }
        </div>
    )
}

export default SearchResults;
