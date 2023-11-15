function SetOptions({ open, setOpen }) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed bg-black/50 w-screen h-screen z-10 top-0 left-0 flex justify-center items-center">
            <div className="bg-primary-background w-1/2 h-1/2 rounded-lg border p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div></div>
                    <div className="text-lg">Set Options</div>
                    <button className="bg-secondary-button p-2 rounded-lg" onClick={() => setOpen(false)}>Close</button>
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <button className="w-[75%] bg-primary-button rounded-lg py-2">Delete Set</button>
                    <button className="w-[75%] bg-primary-button rounded-lg py-2">Edit Set</button>
                    <button className="w-[75%] bg-primary-button rounded-lg py-2">Export Set</button>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default SetOptions;
