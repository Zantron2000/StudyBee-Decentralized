import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from 'wagmi'
import { useSSX } from "@spruceid/ssx-react";
import { Link } from 'react-router-dom';

import SSXManager from "../utils/SSXManager";

function Header() {
    const { open } = useWeb3Modal();
    const { ssx } = useSSX();
    const { isConnected } = useAccount();
    const ssxManager = new SSXManager(ssx);

    const view = isConnected && ssxManager.hasSession() ? 'Account' : 'Connect';

    const search = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full hidden sm:flex justify-center bg-primary-background border-b border-b-white h-[81px]'>
            <nav className="w-[90%] max-w-[1296px] flex items-center justify-between">
                <Link to="/"><h1 className="text-4xl">StudyBee</h1></Link>
                <form
                    className="w-1/2 h-[60%] flex bg-input-background border border-white/0 rounded-full py-1 px-4 focus-within:border-secondary-background"
                    onSubmit={search}
                >
                    <input
                        type="image"
                        name="submit"
                        src="/IconSearch.svg?url"
                        alt="Search"
                        className="w-[10%] h-full p-1 min-w-[35px]"
                    />
                    <input type="text" className="w-[90%] h-full bg-white/0 text-base md:text-xl" placeholder="Search for study sets" />
                </form>
                <button
                    className="bg-secondary-button py-2 px-3 rounded-xl text-xl hover:bg-secondary-button/75"
                    onClick={() => open({ view })}
                >
                    {isConnected && ssxManager.hasSession() ? 'Profile' : 'Log In'}
                </button>
            </nav>
        </div >
    )
}

export default Header
