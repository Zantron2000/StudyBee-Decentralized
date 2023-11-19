import Result from "./Result";

function Results({ questions, manager, setDone }) {
    return (
        <div className="w-full py-2">
            <div className="w-full bg-secondary-background min-h-[75vh] rounded-xl p-4">
                <div className="text-xl py-4">Results</div>
                <div>
                    {
                        ...questions.map((question, index) => {
                            return (
                                <Result question={question} manager={manager} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Results;
