import { useSSX } from "@spruceid/ssx-react";
import { useAccount } from "wagmi";

import MobileHeader from "../MobileHeader";
import Header from "../Header";
import LoginForm from "../LoginForm";
import SSXManager from "../../utils/SSXManager";

function LoginPage({ children }) {
    const { ssx } = useSSX();
    const { isConnected } = useAccount();
    const ssxManager = new SSXManager(ssx);

    return (
        <>
            {
                (ssxManager.hasSession() && isConnected) ? { ...children } :
                    <>
                        <MobileHeader />
                        <Header />
                        <LoginForm />
                    </>
            }
        </>
    );
};

export default LoginPage;
