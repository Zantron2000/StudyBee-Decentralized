import { useState, useEffect } from 'react';

function HomeCard({ id, term, setTerm, index }) {
    const [editting, setEditting] = useState(false);
    const [card, setCard] = useState(term);

    useEffect(() => {
        if (editting) {
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach((textarea) => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        }
    }, [editting]);

    const updateTerm = (event) => {
        if (event.target.value.length <= 250) {
            setCard({ ...card, term: event.target.value });
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
        }
    }

    const updateDefinition = (event) => {
        if (event.target.value.length <= 500) {
            setCard({ ...card, definition: event.target.value });
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
        }
    }

    const cancelUpdate = (event) => {
        event.preventDefault();
        setCard(term);
        setEditting(false);
    }

    const submitUpdate = (event) => {
        event.preventDefault();
        setTerm(id, card);
        setEditting(false);
    }

    const edittingCard = (
        <form>
            <div className='px-4 mx-4 py-2 text-xl flex flex-col items-center justify-between space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4'>
                <div className='text-2xl'>Card {index + 1}</div>
                <div className='sm:space-x-8 w-full sm:w-auto space-y-4 sm:space-y-0'>
                    <button
                        className="w-full sm:w-auto py-1 px-4 rounded-lg bg-primary-button hover:bg-primary-button/75"
                        onClick={submitUpdate}
                    >
                        Save
                    </button>
                    <button
                        className="w-full sm:w-auto py-1 px-4 rounded-lg bg-primary-button hover:bg-primary-button/75"
                        onClick={cancelUpdate}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className='flex w-full sm:flex-row flex-col items-center sm:items-start mb-4'>
                <div className='w-full sm:w-[50%] px-8'>
                    <label htmlFor="term" className='text-xl' >Term<span className="text-red-500">*</span></label>
                    <div className='bg-input-background py-2 my-2 px-4 rounded-lg text-base sm:text-lg'>
                        <textarea
                            type="text"
                            id="term"
                            name="term"
                            required
                            className="bg-input-background w-full h-full rounded-lg resize-none overflow-hidden"
                            placeholder='Enter term here...'
                            value={card.term}
                            onChange={updateTerm}
                        />
                    </div>
                    <div className="flex justify-end py-2">{card.term.length}/250</div>
                </div>
                <div className='w-full sm:w-[50%] px-8'>
                    <label htmlFor="definition" className='text-xl'>Definition<span className="text-red-500">*</span></label>
                    <div className='bg-input-background py-2 my-2 px-4 rounded-lg text-base sm:text-lg'>
                        <textarea
                            type="text"
                            id="definition"
                            name="definition"
                            required
                            className="bg-input-background w-full h-full rounded-lg resize-none overflow-hidden"
                            placeholder='Enter definition here...'
                            value={card.definition}
                            onChange={updateDefinition}
                        />
                    </div>
                    <div className="flex justify-end py-2">{card.definition.length}/500</div>
                </div>
            </div>
        </form>
    );

    const displayCard = (
        <div>
            <div className='px-4 mx-4 py-2 text-xl flex flex-col items-center justify-between space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4'>
                <div className='text-2xl'>Card {index + 1}</div>
                <div className='w-full sm:w-auto'>
                    <button
                        className="w-full sm:w-auto py-1 px-4 rounded-lg bg-primary-button hover:bg-primary-button/75"
                        onClick={() => setEditting(true)}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-center sm:items-start sm:flex-row py-2 px-8 sm:px-0 mb-4'>
                <div className="w-full sm:w-[50%] py-4 sm:py-1 sm:px-8 h-auto text-base sm:text-lg">
                    {term.term}
                </div>
                <div className="w-full sm:w-[50%] py-4 sm:py-1 sm:px-8 border-t-2 sm:border-t-0 sm:border-l-2 border-white text-base sm:text-lg">
                    {term.definition}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-secondary-background py-2 rounded-lg break-words text-lg">
            {editting ? edittingCard : displayCard}
        </div>
    );
}

export default HomeCard;
