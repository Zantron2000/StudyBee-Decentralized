function StatusCard({ term, definition, score }) {

    const getScoreColor = () => {
        if (score < 0) {
            return "#FF0000";
        } else if (score < 5) {
            return "#FFFF00";
        } else {
            return "#00FF00";
        }
    }

    return (
        <div className="bg-secondary-background py-2 rounded-lg flex flex-col sm:flex-row break-words">
            <div className="w-full sm:w-[40%] md:w-[42.5%] py-1 px-2 h-auto">
                {term}
            </div>
            <div className="w-full sm:w-[40%] md:w-[42.5%] py-1 px-2 border-t-2 sm:border-t-0 sm:border-l-2 border-primary-background">
                {definition}
            </div>
            <div className="w-full sm:w-[20%] md:w-[15%] flex justify-center items-start">
                {score === undefined ? null : <p
                    className={`border border-[${getScoreColor()}] py-2 px-4 rounded-lg`}
                >
                    Score: <span className={`text-[${getScoreColor()}]`}>{score}</span>
                </p>}
            </div>
        </div>
    );
}

export default StatusCard;
