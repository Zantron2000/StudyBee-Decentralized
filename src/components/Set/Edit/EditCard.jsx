import FormManager from "../../../utils/Managers/Set/FormManager";

function CreateCard({ index, card, manager, errors }) {
    const resizeTextareaWrapper = (func) => {
        return (event) => {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
            func(index, event.target.value);
        }
    }

    const disableEventWrapper = (func) => {
        return (event) => {
            event.preventDefault();
            func();
        }
    }

    return (
        <div className='bg-secondary-background rounded-lg p-2'>
            <div className='text-xl py-2 px-2 flex justify-between'>
                <p>Card {index + 1}</p>
                <button className='border border-white py-2 px-2 rounded-lg hover:bg-black/50' onClick={disableEventWrapper(() => manager.removeCard(index))}>Delete</button>
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
                            onChange={resizeTextareaWrapper((index, term) => manager.updateTerm(index, term))}
                        />
                    </div>
                    <div className="flex justify-between py-2 text-lg">
                        <div className='text-[#ff0000]'>{errors?.term}</div>
                        <div>{card.term.length}/{FormManager.MAX_TERM_LENGTH}</div>
                    </div>
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
                            onChange={resizeTextareaWrapper((index, term) => manager.updateDefinition(index, term))}
                        />
                    </div>
                    <div className="flex justify-between py-2 text-lg">
                        <div className='text-[#ff0000]'>{errors?.definition}</div>
                        <div>{card.definition.length}/{FormManager.MAX_DEFINITION_LENGTH}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCard;
