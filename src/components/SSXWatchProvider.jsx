import { useWalletClient } from 'wagmi';
import { useDisconnect } from 'wagmi';
import { SSXProvider } from '@spruceid/ssx-react';

function SSXWatchProvider({ children }) {
    const { data: walletClient } = useWalletClient();
    const { disconnect } = useDisconnect();

    const web3Provider = { provider: walletClient };
    const ssxConfig = {
        siweConfig: {
            domain: 'localhost:5173',
        },
        modules: {
            storage: true,
        }
    };
    const watchProvider = async (provider, ssx) => {
        try {
            if (ssx) {
                // SignIn
                if (provider && !ssx.address()) {
                    await ssx.signIn();

                    return ssx;

                    // Change Account
                } else if (provider && ssx.address() && provider.account.address !== ssx.address()) {
                    await ssx.signOut();
                    await ssx.signIn();
                    return ssx;

                    // SignOut
                } else {
                    await ssx.signOut();
                }
            }
        } catch {
            disconnect();
        }
    }

    return (
        <SSXProvider watchProvider={watchProvider} web3Provider={web3Provider} ssxConfig={ssxConfig} >
            {children}
        </SSXProvider>
    )
}

export default SSXWatchProvider;
