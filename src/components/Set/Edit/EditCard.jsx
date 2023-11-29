function EditCard({ id, card, setCardTerm, setCardDefinition, deleteCard }) {
    const deleteCardSafe = (event) => {
        event.preventDefault();
        deleteCard(id);
    }

    return (
        <div className='bg-secondary-background rounded-lg p-2'>
            <div className='text-xl py-2 px-2 flex justify-between'>
                <p>Card {id + 1}</p>
                <button className='border border-white py-2 px-1 rounded-lg hover:bg-black/25' onClick={deleteCardSafe}>Delete</button>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between'>
                <div className='w-full sm:w-[50%] px-2'>
                    <label htmlFor="term" className='text-xl' >Term<span className="text-red-500">*</span></label>
                    <div className='bg-input-background py-2 px-4 rounded-lg'>
                        <textarea
                            type="text"
                            id="term"
                            name="term"
                            required
                            className="bg-input-background w-full h-full rounded-lg resize-none overflow-hidden text-lg"
                            placeholder='Enter term here...'
                            value={card.term}
                            onChange={(event) => setCardTerm(id, event.target.value)}
                        />
                    </div>
                    <div className="flex justify-end py-2">{card.term.length}/250</div>
                </div>
                <div className='w-full sm:w-[50%] px-2'>
                    <label htmlFor="definition" className='text-xl' >Definition<span className="text-red-500">*</span></label>
                    <div className='bg-input-background py-2 px-4 rounded-lg'>
                        <textarea
                            type="text"
                            id="definition"
                            name="definition"
                            required
                            className="bg-input-background w-full h-full rounded-lg resize-none overflow-hidden text-lg"
                            placeholder='Enter definition here...'
                            value={card.definition}
                            onChange={(event) => setCardDefinition(id, event.target.value)}
                        />
                    </div>
                    <div className="flex justify-end py-2">{card.definition.length}/500</div>
                </div>
            </div>
        </div>
    );
}

export default EditCard;
