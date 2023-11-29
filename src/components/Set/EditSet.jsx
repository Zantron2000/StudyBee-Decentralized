import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";
import { useNavigate } from "react-router-dom";

import SSXManager from "../../utils/SSXManager";
import SetManager from "../../utils/SetManager";
import EditCard from "./Edit/EditCard";

function EditSet({ set, setSet }) {
    const [title, setTitle] = useState(set.title);
    const [description, setDescription] = useState(set.description);
    const [terms, setTerms] = useState(set.cards);
    const { ssx } = useSSX();
    const navigate = useNavigate();
    const setManager = new SetManager(ssx);
    const ssxManager = new SSXManager(ssx);

    const upsertSet = async (event) => {
        event.preventDefault();

        const tempSet = {
            ...set,
            title,
            description,
            cards: terms,
            size: terms.length,
        };

        SetManager.addCardIds(tempSet);

        if (ssxManager.hasSession()) {
            const hash = await setManager.upsertSet(tempSet);

            tempSet.hash = hash;
            navigate(`/sets/${hash}`, { state: { set: tempSet } });
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

        console.log('Delete Card', newTerms)
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
                <h1 className="text-2xl">Edit a Set</h1>
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
                                onChange={(event) => setValue(setTitle, 100, event.target.value)}
                            />
                        </div>
                        <div className="flex justify-end py-2">{title.length}/100</div>
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
                                    <EditCard
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
                    <div className='my-4 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between text-xl'>
                        <button className='p-4 bg-primary-button rounded-lg' onClick={addCard}>Add another card</button>
                        <button
                            className='p-4 bg-primary-button rounded-lg'
                            onClick={upsertSet}
                        >
                            Update Set
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSet
