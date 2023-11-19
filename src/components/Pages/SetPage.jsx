import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSSX } from '@spruceid/ssx-react';
import { useEffect, useState } from 'react';

import MobileHeader from '../MobileHeader';
import Header from '../Header';
import Footer from '../Footer';
import HomeSet from '../HomeSet';
import SetManager from '../../utils/SetManager';

function SetPage({ set, setSet }) {
    const { ssx } = useSSX();
    const nav = useNavigate();

    return (
        <>
            <MobileHeader />
            <Header />
            <HomeSet set={set} setSet={setSet} />
            <Footer />
        </>
    )
}

export default SetPage
