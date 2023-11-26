import QuizManager from "../../../utils/Managers/Study/QuizManager";
import MultipleChoiceManager from "../../../utils/Managers/Study/MultipleChoiceManager";
import { capitalize } from '../../../utils/tools';
import Choice from "./Choice";

function MultipleChoice({ question, manager }) {
    const { ask, card: rightCard, order, answer } = question;
    const provided = QuizManager.getProvided(ask);

    const select = (value) => {
        manager.updateAnswer(value);
    }

    return (
        <div className="w-full">
            <div className="w-full bg-secondary-background p-4 rounded-lg min-h-[50vh] flex flex-col justify-between">
                <div className="pb-8">
                    <p className="text-gray-300">{capitalize(provided)}</p>
                    <p className="text-xl">{rightCard[provided]}</p>
                </div>
                <div className="py-2">
                    {`Select the right ${ask}`}
                </div>
                <div className="w-full flex flex-col space-y-4">
                    {
                        ...order.map((id, index) => {
                            const card = MultipleChoiceManager.getCard(id, question);

                            return <Choice key={id} value={id} answer={card[ask]} number={index} select={select} selected={answer === id} />
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MultipleChoice;
