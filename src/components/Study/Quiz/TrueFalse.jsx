import QuizManager from "../../../utils/Managers/Study/QuizManager";
import TrueFalseManager from "../../../utils/Managers/Study/TrueFalseManager";
import { capitalize } from '../../../utils/tools';

function TrueFalse({ question, manager }) {
    const { ask, card: rightCard, answer } = question;
    const provided = QuizManager.getProvided(ask);
    const possibleAnswer = TrueFalseManager.getPossibleAnswer(question);

    const setTrue = () => {
        manager.updateAnswer(true);
    }

    const setFalse = () => {
        manager.updateAnswer(false);
    }

    return (
        <div className="w-full bg-secondary-background p-4 rounded-lg h-full flex flex-col justify-between min-h-[70vh]">
            <div>
                <div className="pb-8">
                    <p className="text-gray-300">{capitalize(provided)}</p>
                    <p className="text-xl">{rightCard[provided]}</p>
                </div>
                <div className="py-2">
                    {`The ${ask} of this card is:`}
                </div>
                <div className="w-full flex flex-col space-y-4 text-xl">
                    {possibleAnswer}
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    className={`bg-primary-button w-1/3 py-4 rounded-xl text-xl ${answer === false ? 'bg-black' : 'hover:bg-primary-button/75'}`}
                    onClick={setFalse}
                    disabled={answer === false}
                >
                    False
                </button>
                <button
                    className={`bg-primary-button w-1/3 py-4 rounded-xl text-xl ${answer === true ? 'bg-black' : 'hover:bg-primary-button/75'}`}
                    onClick={setTrue}
                    disabled={answer === true}
                >
                    True
                </button>
            </div>
        </div>
    );
}

export default TrueFalse;
