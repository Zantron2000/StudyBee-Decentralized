function Header() {

    const search = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full flex justify-center bg-primary-background border-b border-b-white h-[125px] sm:hidden'>
            <nav className="w-[90%] max-w-[1296px] flex flex-col items-center justify-between py-2">
                <div className="flex justify-between items-center w-full py-2">
                    <h1 className="text-2xl md:text-4xl text-center">StudyBee</h1>

                    <button className="bg-secondary-button py-2 px-3 rounded-xl text-base md:text-xl">Sign In</button>
                </div>
                <div className="flex justify-between w-full py-2">
                    <form
                        className="w-full h-[60%] flex bg-input-background border border-white/0 rounded-full py-1 px-4 focus-within:border-secondary-background"
                        onSubmit={search}
                    >
                        <input
                            type="image"
                            name="submit"
                            src="/IconSearch.svg?url"
                            alt="Search"
                            className="w-[10%] h-full p-1 min-w-[50px]"
                        />
                        <input type="text" className="w-[90%] h-full bg-white/0 text-base md:text-xl" placeholder="Search for study sets" />
                    </form>
                </div>
            </nav>
        </div >
    )
}

export default Header
