function LoadScreen() {
    return (
        <div className="w-full">
            <div className="flex justify-center full py-4 text-lg">Enjoy this bee made by my girlfriend while you wait</div>
            <div className="w-full min-h-[60vh] flex justify-center items-center">
                <img src="Mascot.png?url" alt="Mascot" className={`h-1/2 animate-[spin_2s_linear_infinite]`} />
            </div>
        </div>
    )
}

export default LoadScreen;
