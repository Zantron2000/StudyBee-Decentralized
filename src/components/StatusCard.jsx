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
            <div className="w-full sm:w-[45%] py-1 px-2 h-auto">
                Pizza
            </div>
            <div className="w-full sm:w-[45%] py-1 px-2 border-t-2 sm:border-t-0 sm:border-l-2 border-primary-background">
                die Pizza
            </div>
            <div className="w-full sm:w-[10%] flex justify-center items-start">
                <p
                    className={`border border-[${getScoreColor()}] py-2 px-4 rounded-lg`}
                >
                    Score: <span className={`text-[${getScoreColor()}]`}>{score}</span>
                </p>
            </div>
        </div>
    );
}

export default StatusCard;
