function Footer() {
    return (
        <footer className="w-full flex justify-start flex-col items-center sm:justify-center bg-primary-background border-t border-t-white py-8 mt-8">
            <nav className="w-[90%] max-w-[1296px] flex items-center justify-between flex-col sm:flex-row">
                <div className="py-2">
                    <img src="/StudyBee.jpg?" className="w-[200px] h-[200px] sm:w-[253px] sm:h-[253px]" />
                </div>
                <div className="py-2">
                    <div className="py-4 text-xl lg:text-2xl">
                        <p className="font-bold">About</p>
                    </div>
                    <div className="text-lg lg:text-xl">
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid">About Us</p></a>
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid">Our Mission</p></a>
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid">How it works</p></a>
                    </div>
                </div>
                <div className="py-2">
                    <div className="py-4 text-xl lg:text-2xl">
                        <p className="font-bold">For Students</p>
                    </div>
                    <div className="text-lg lg:text-xl">
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid px">Quiz</p></a>
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid">Learn</p></a>
                        <a href="#" className="py-1"><p className="border-b border-b-white/0 hover:border-b-white divide-solid">Flash Cards</p></a>
                    </div>
                </div>
                <div className="py-2">
                    <div className="py-4 text-xl lg:text-2xl">
                        <p className="font-bold">Follow Us</p>
                    </div>
                    <div className="flex flex-row">
                        <a href="#"><img className="p-2 border rounded-full border-white/0 hover:border-white" src="/IconYoutube.svg?" /></a>
                        <a href="#"><img className="p-2 border rounded-full border-white/0 hover:border-white" src="/IconX.svg?" /></a>
                        <a href="#"><img className="p-2 border rounded-full border-white/0 hover:border-white" src="/IconX.svg?" /></a>
                        <a href="#"><img className="p-2 border rounded-full border-white/0 hover:border-white" src="/IconYoutube.svg?" /></a>
                    </div>
                </div>
            </nav>
            <p>© 2023 StudyBee, All Rights Reserved</p>
        </footer>
    )
}

export default Footer
