function RoundResults({ manager, activateNextRound, roundNumber }) {
    const totalUnpresented = manager.getTotalUnpresentedCards();
    const totalInProgress = manager.getTotalProgressCards() - totalUnpresented;
    const totalFinished = manager.getTotalFinishedCards();

    return (
        <div className="py-8 w-[80%]">
            <div className="bg-secondary-background w-full min-h-[50vh] rounded-lg text-white p-8 flex flex-col items-center text-xl justify-between">
                <div>
                    <h1 className="text-2xl">Results for Round {roundNumber}</h1>
                </div>
                <div className="flex justify-around w-full">
                    <div className="w-1/4 flex justify-center">
                        <p><span className="text-[#ff0000]">{totalUnpresented}</span> terms not presented</p>
                    </div>
                    <div className="w-1/4 flex justify-center">
                        <p><span className="text-[#ffff00]">{totalInProgress}</span> terms in progress</p>
                    </div>
                    <div className="w-1/4 flex justify-center">
                        <p><span className="text-[#00ff00]">{totalFinished}</span> terms finished</p>
                    </div>
                </div>
                <div className="w-full">
                    <button
                        className="bg-primary-button hover:bg-primary-button/75 w-full px-2 py-4 rounded-lg"
                        onClick={activateNextRound}
                    >
                        {manager.getTotalProgressCards() !== 0 ? 'Start Next Round' : 'Finish Learn'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoundResults;
