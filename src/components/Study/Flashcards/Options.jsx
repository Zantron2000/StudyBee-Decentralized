function Options({ close, updateOptions }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black/50">
            <div className="max-w-[500px] w-1/2 min-h-[75%] border-white border rounded-lg bg-primary-background p-4 flex flex-col justify-between">
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="w-1/3 flex items-center justify-start"></div>
                        <div className="w-1/3 flex items-center justify-center">
                            <h2>Options</h2>
                        </div>
                        <div className="w-1/3 flex items-center justify-end">
                            <button
                                className="bg-secondary-button px-2 py-2 rounded-lg hover:bg-secondary-button/75"
                                onClick={close}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <form>
                        Hi
                    </form>
                </div>
                <button
                    className="w-full bg-primary-button px-2 py-4 rounded-lg hover:bg-primary-button/75"
                    onClick={updateOptions}
                >
                    Update Options
                </button>
            </div>
        </div>
    )
}

export default Options
