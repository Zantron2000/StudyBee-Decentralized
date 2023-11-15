import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from 'wagmi'
import { useSSX } from "@spruceid/ssx-react";

import SSXManager from "../utils/SSXManager";

function LoginForm() {
    const { open, close } = useWeb3Modal();
    const { ssx } = useSSX();
    const { isConnected } = useAccount();
    const ssxManager = new SSXManager(ssx);

    const view = isConnected && ssxManager.hasSession() ? 'Account' : 'Connect';

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 my-4 flex flex-col items-center">
            <div className="w-[80%] flex justify-center items-center min-h-[75vh] flex-col space-y-4">
                <div className="text-lg">
                    To go further, you'll need to be logged in
                </div>
                <button
                    className="w-full text-xl p-8 bg-secondary-button w-1/2 rounded-lg"
                    onClick={() => open({ view })}
                >
                    Sign in with Ethereum
                </button>
            </div>
        </div >
    )
}

export default LoginForm;
