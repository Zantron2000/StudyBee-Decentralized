import { useEffect, useState } from 'react';
import { useSSX } from '@spruceid/ssx-react';
import { useNavigate, Link } from 'react-router-dom';

import CreateCard from './CreateCard';
import SetManager from '../utils/SetManager';
import SSXManager from '../utils/SSXManager';
import FormManager from '../utils/Managers/Set/FormManager';

function CreateSet() {
    const [set, setSet] = useState(FormManager.getDefaultSet());
    const [errors, setErrors] = useState(FormManager.getDefaultErrors());
    const { ssx } = useSSX();
    const navigate = useNavigate();
    const setManager = new SetManager(ssx);
    const ssxManager = new SSXManager(ssx);
    const formManager = new FormManager(set, setSet, errors, setErrors);

    const createSet = async (event) => {
        event.preventDefault();
        const isValid = formManager.validate();

        if (isValid && ssxManager.hasSession()) {
            SetManager.addCardIds(set);
            const hash = await setManager.addSet(set);

            set.hash = hash;
            navigate(`/sets/${hash}`, { state: { set } });
        }
    };

    const resizeTextareaWrapper = (func) => {
        return (event) => {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
            func(event.target.value);
        }
    }

    const disableEventWrapper = (func) => {
        return (event) => {
            event.preventDefault();
            func();
        }
    }

    useEffect(() => {
        if (set !== FormManager.DEFAULT_SET) {
            setSet(FormManager.getDefaultSet());
        }
    }, []);

    return (
        <div className={`w-[90%] max-w-[1296px] mx-auto py-4 min-h-[60vh] overflow-hidden`} >
            <div className="py-4 flex justify-between items-center">
                <h1 className="text-2xl">Create a new set</h1>
                <Link to='/' className='text-xl p-2 bg-primary-button rounded-lg hover:bg-primary-button/50'>Cancel</Link>
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
                                value={formManager.getTitle()}
                                placeholder='Enter a title for the set...'
                                onChange={resizeTextareaWrapper((title) => formManager.updateTitle(title))}
                            />
                        </div>
                        <div className="flex justify-between py-2 text-lg">
                            <div className='text-[#ff0000]'>{errors.title}</div>
                            <div>{formManager.getTitle().length}/{FormManager.MAX_TITLE_LENGTH}</div>
                        </div>
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
                                value={formManager.getDescription()}
                                placeholder='Enter a description for the set...'
                                onChange={resizeTextareaWrapper((description) => formManager.updateDescription(description))}
                            />
                        </div>
                        <div className="flex justify-between py-2 text-lg">
                            <div className='text-[#ff0000]'>{errors.description}</div>
                            <div>{formManager.getDescription().length}/{FormManager.MAX_DESCRIPTION_LENGTH}</div>
                        </div>
                    </div>
                    <div className='space-y-8 mb-12'>
                        {
                            ...formManager.getCards().map((card, index) => {
                                return (
                                    <CreateCard
                                        key={index}
                                        index={index}
                                        card={card}
                                        manager={formManager}
                                        errors={errors.cards[index]}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between text-xl'>
                        <button
                            className='p-4 bg-primary-button rounded-lg hover:bg-primary-button/50'
                            onClick={disableEventWrapper(() => formManager.addCard())}
                        >
                            Add another card
                        </button>
                        <button
                            className='p-4 bg-primary-button rounded-lg hover:bg-primary-button/50'
                            onClick={createSet}
                        >
                            Save Set
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSet;
