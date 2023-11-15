import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSSX } from '@spruceid/ssx-react';
import { useEffect, useState } from 'react';

import MobileHeader from '../MobileHeader';
import Header from '../Header';
import Footer from '../Footer';
import HomeSet from '../HomeSet';
import LoadScreen from '../LoadScreen';
import SetManager from '../../utils/SetManager';

function SetPage() {
    const [set, setSet] = useState(undefined);
    const { ssx } = useSSX();
    const { setHash } = useParams();
    const location = useLocation();
    const nav = useNavigate();
    const setManager = new SetManager(ssx, nav);

    useEffect(() => {
        const loadSet = async () => {
            const set = await setManager.loadSet(location.state?.set, setHash);
            setSet(set);
        };

        loadSet();
    }, [setHash]);

    return (
        <>
            <MobileHeader />
            <Header />
            {set === undefined ? <LoadScreen /> : <HomeSet set={set} setSet={setSet} />}
            <Footer />
        </>
    )
}

export default SetPage
