function Choice({ answer, number, select, reveal = false, isAnswer = false, disable = false }) {
    const selectChoice = (event) => {
        event.preventDefault();

        select(number);
    }

    const revealed = `${isAnswer ? 'bg-green-500' : 'border-[#ff0000]'}`;

    return (
        <button
            className={"w-full text-start border p-4 rounded-lg" + (reveal ? ` ${revealed}` : disable ? '' : ' hover:bg-black/50 border-red')}
            onClick={selectChoice}
            disabled={disable}
        >
            <div className="flex">
                <p className="w-[5%] p-2 flex items-center justify-center hidden sm:block">{number + 1}</p>
                <p className="w-[95%] flex items-center">{answer}</p>
            </div>
        </button>
    )
}

export default Choice;
