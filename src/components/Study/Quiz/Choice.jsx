function Choice({ answer, number, select, value, selected }) {
    const selectChoice = (event) => {
        event.preventDefault();

        select(value);
    }

    return (
        <button
            className={`w-full text-start border p-4 rounded-lg ${selected ? 'bg-primary-background' : 'hover:bg-black/75'}`}
            onClick={selectChoice}
        >
            <div className="flex">
                <p className="w-[5%] p-2 flex items-center justify-center hidden sm:block">{number + 1}</p>
                <p className="w-[95%] flex items-center">{answer}</p>
            </div>
        </button>
    )
}

export default Choice;
