import { useState, useEffect } from 'react';
import { useSSX } from '@spruceid/ssx-react';
import { useNavigate } from 'react-router-dom';

import CreateCard from './CreateCard';
import SetManager from '../utils/SetManager';
import SSXManager from '../utils/SSXManager';

function CreateSet() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [terms, setTerms] = useState([{ term: '', definition: '' }]);
    const { ssx } = useSSX();
    const navigate = useNavigate();

    const setManager = new SetManager(ssx);
    const ssxManager = new SSXManager(ssx);

    const createSet = async (event) => {
        event.preventDefault();

        const set = {
            title,
            description,
            cards: terms,
        };

        if (ssxManager.hasSession()) {
            const hash = await setManager.addSet(set);

            set.hash = hash;
            navigate(`/sets/${hash}`, { state: { set } });
        }
    };

    const setValue = (setter, maxLength, value) => {
        if (value.length <= maxLength) {
            setter(value);
        }
    };

    const setCardTerm = (index, value) => {
        if (value.length <= 250) {
            const newTerms = [...terms];
            newTerms[index].term = value;

            setTerms(newTerms);
        }
    };

    const setCardDefinition = (index, value) => {
        if (value.length <= 500) {
            const newTerms = [...terms];
            newTerms[index].definition = value;

            setTerms(newTerms);
        }
    };

    const addCard = (event) => {
        event.preventDefault();
        const newTerms = [...terms, { term: '', definition: '' }];

        setTerms(newTerms);
    };

    const deleteCard = (index) => {
        const newTerms = [...terms];
        newTerms.splice(index, 1);

        if (newTerms.length === 0) {
            newTerms.push({ term: '', definition: '' });
        }

        setTerms(newTerms);
    };

    // Add an useEffect to attach a listener to all textareas, that prints hello on input
    useEffect(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', (event) => {
                event.target.style.height = 'auto';
                event.target.style.height = `${event.target.scrollHeight}px`;
            });
        });
    }, []);

    return (
        <div className="w-[90%] max-w-[1296px] mx-auto py-4  min-h-[60vh]">
            <div className="py-4">
                <h1 className="text-2xl">Create a new set</h1>
            </div>
            <div>
                <form>
                    <div className="flex flex-col pb-4">
                        <label htmlFor="title" className='text-xl'>Title<span className="text-red-500">*</span></label>
                        <div className='bg-input-background py-2 px-4 rounded-lg'>
                            <textarea
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="bg-input-background w-full h-[50%] rounded-lg resize-none overflow-hidden text-lg"
                                value={title}
                                onChange={(event) => setValue(setTitle, 250, event.target.value)}
                            />
                        </div>
                        <div className="flex justify-end py-2">{title.length}/250</div>
                    </div>
                    <div className="flex flex-col pb-4">
                        <label htmlFor="description" className='text-xl' >Description<span className="text-red-500">*</span></label>
                        <div className='bg-input-background py-2 px-4 rounded-lg'>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                required
                                className="bg-input-background w-full h-full rounded-lg resize-none overflow-hidden text-lg"
                                value={description}
                                onChange={(event) => setValue(setDescription, 500, event.target.value)}
                            />
                        </div>
                        <div className="flex justify-end py-2">{description.length}/500</div>
                    </div>
                    <div className='space-y-4'>
                        {
                            ...terms.map((card, index) => {
                                return (
                                    <CreateCard
                                        key={index}
                                        id={index}
                                        card={card}
                                        setCardTerm={setCardTerm}
                                        setCardDefinition={setCardDefinition}
                                        deleteCard={deleteCard}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className='my-4 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between'>
                        <button className='p-4 bg-primary-button rounded-lg' onClick={addCard}>Add another card</button>
                        <button
                            className='p-4 bg-primary-button rounded-lg'
                            onClick={createSet}
                        >
                            Create Set
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSet;
