import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSSX } from '@spruceid/ssx-react';

import HomeCard from './HomeCard';
import SetOptions from './SetOptions';
import SetManager from '../utils/SetManager';
import SSXManager from '../utils/SSXManager';

function HomeSet({ set, setSet }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [display, setDisplay] = useState('term');
    const [openOptions, setOpenOptions] = useState(false);
    const { ssx } = useSSX();
    const nav = useNavigate();

    const title = set?.title || '';
    const description = set?.description || '';
    const cards = set?.cards || [];

    const setManager = new SetManager(ssx, nav);
    const ssxManager = new SSXManager(ssx);

    const setCard = async (index, card) => {
        const newCards = [...cards];
        newCards[index] = card;

        if (ssxManager.hasSession()) {
            await setManager.updateSet(set.hash, { ...set, cards: newCards });
        }

        setSet({ ...set, cards: newCards });
    };

    const nextCard = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(currentCard + 1);
        } else {
            setCurrentCard(0);
        }
        setDisplay('term');
    };

    const previousCard = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
        } else {
            setCurrentCard(cards.length - 1);
        }
        setDisplay('term');
    }

    const flipCard = () => {
        if (display === 'term') {
            setDisplay('definition');
        } else {
            setDisplay('term');
        }
    };

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4 min-h-[60vh]">
            <div className="py-4 text-lg sm:text-xl">
                <h1>{title}</h1>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 py-4 text-xl space-y-8 md:space-y-0">
                <div className='w-full md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4'>
                    <Link
                        className="w-full md:w-1/3 bg-primary-button py-2 px-4 rounded-lg text-center hover:bg-primary-button/75"
                        to={`/sets/${set.hash}/flashcards`}
                        state={{ set }}
                    >
                        Flashcards
                    </Link>
                    <Link
                        className="w-full md:w-1/3 bg-primary-button py-2 px-4 rounded-lg text-center hover:bg-primary-button/75"
                        to={`/sets/${set.hash}/learn`}
                        state={{ set }}
                    >
                        Learn
                    </Link>
                    <Link
                        className="w-full md:w-1/3 bg-primary-button py-2 px-4 rounded-lg text-center hover:bg-primary-button/75"
                        to={`/sets/${set.hash}/quiz`}
                        state={{ set }}
                    >
                        Quiz
                    </Link>
                </div>
                <button
                    className="w-full md:w-1/5 md:max-w-[250px] bg-secondary-button py-2 px-4 rounded-lg hover:bg-secondary-button/75"
                    onClick={() => setOpenOptions(true)}

                >Options
                </button>
            </div>
            <div className="py-2">
                <div>
                    <div className="text-xl mb-2">
                        <h2>Preview</h2>
                    </div>
                    <button className="w-full bg-secondary-background p-4 rounded-lg" onClick={flipCard}>
                        <div className="min-h-[50vh] md:min-h-[35vh] lg:min-h-[25vh] w-full flex justify-center items-center text-lg sm:text-xl">{cards?.[currentCard]?.[display]}</div>
                        <div className="py-2 w-full flex justify-center items-center">Click to flip</div>
                    </button>
                </div>
                <div className="flex justify-center py-4">
                    <div className="flex justify-between w-[90%] sm:w-1/2 md:w-1/3 items-center">
                        <button onClick={previousCard}>
                            <div className="text-lg border border-white py-2 px-4 rounded-lg hover:bg-secondary-button">
                                Back
                            </div>
                        </button>
                        <div className="text-lg sm:text-xl">{currentCard + 1}/{cards?.length}</div>
                        <button onClick={nextCard}>
                            <div className="text-lg border border-white py-2 px-4 rounded-lg hover:bg-secondary-button">
                                Next
                            </div>
                        </button>
                    </div>
                </div>
                <div className="py-2">
                    {description}
                </div>
            </div>
            <div className="py-2">
                <div className="py-2 text-lg">
                    <h2>Cards in this set</h2>
                </div>
                <div className="space-y-12 flex flex-col">
                    {
                        ...cards?.map((term, index) => {
                            return (
                                <HomeCard
                                    key={index}
                                    id={index}
                                    term={term}
                                    setTerm={setCard}
                                    index={index}
                                />
                            );
                        })
                    }
                </div>
            </div>
            <SetOptions open={openOptions} setOpen={setOpenOptions} manager={setManager} set={set} />
        </div>
    );
}

export default HomeSet;
