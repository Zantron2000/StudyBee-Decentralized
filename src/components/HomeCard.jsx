import { useState, useEffect } from 'react';

function HomeCard({ id, term, setTerm }) {
    const [editting, setEditting] = useState(false);
    const [card, setCard] = useState(term);

    const updateTerm = (event) => {
        if (event.target.value.length <= 250) {
            setCard({ ...card, term: event.target.value });
        }
    }

    const updateDefinition = (event) => {
        if (event.target.value.length <= 500) {
            setCard({ ...card, definition: event.target.value });
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

    const edittingCard = (
        <form className='flex w-full sm:flex-row flex-col items-center sm:items-start'>
            <div className='w-full sm:w-[45%] px-2'>
                <label for="term" className='text-xl' >Term<span className="text-red-500">*</span></label>
                <div className='bg-input-background py-2 px-4 rounded-lg'>
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
            <div className='w-full sm:w-[45%] px-2'>
                <label for="definition" className='text-xl' >Definition<span className="text-red-500">*</span></label>
                <div className='bg-input-background py-2 px-4 rounded-lg'>
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
            <div className="w-1/2 sm:w-[10%] flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start sm:space-y-4">
                <button
                    className="border py-2 px-4 rounded-lg hover:bg-secondary-button"
                    onClick={submitUpdate}
                >
                    Done
                </button>
                <button
                    className="border py-2 px-4 rounded-lg hover:bg-secondary-button"
                    onClick={cancelUpdate}
                >
                    Cancel
                </button>
            </div>
        </form>
    );

    const displayCard = (
        <>
            <div className="w-full sm:w-[45%] py-1 px-2 h-auto">
                {term.term}
            </div>
            <div className="w-full sm:w-[45%] py-1 px-2 border-t-2 sm:border-t-0 sm:border-l-2 border-primary-background">
                {term.definition}
            </div>
            <div className="w-full sm:w-[10%] flex justify-center items-start">
                <button
                    className="border py-2 px-4 rounded-lg hover:bg-secondary-button"
                    onClick={() => setEditting(true)}
                >
                    Edit
                </button>
            </div>
        </>
    );

    return (
        <div className="bg-secondary-background py-2 rounded-lg flex flex-col sm:flex-row break-words">
            {editting ? edittingCard : displayCard}
        </div>
    );
}

export default HomeCard;
