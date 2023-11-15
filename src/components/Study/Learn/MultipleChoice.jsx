import { useState, useEffect } from "react";

import Choice from "./Choice";
import LearnManager from "../../../utils/Managers/LearnManager";

function MultipleChoice({ card, wrongCards, setCorrect, ask }) {
    const [choice, setChoice] = useState(-1);
    const [answer] = useState(Math.floor(Math.random() * (1 + wrongCards.length)));
    const provided = ask === LearnManager.TERM ? LearnManager.DEFINITION : LearnManager.TERM;

    const choices = [];
    for (let i = 0; i < 1 + wrongCards.length; i++) {
        if (i === answer) {
            choices.push(<Choice answer={card[ask]} number={i} reveal={choice !== -1} isAnswer={answer === i} select={setChoice} disable={choice !== -1} />);
        } else {
            choices.push(<Choice
                answer={wrongCards[i < answer ? i : i - 1][ask]}
                number={i}
                reveal={choice !== -1 && choice !== answer}
                isAnswer={answer === i}
                select={setChoice}
                disable={choice !== -1}
            />);
        }
    }

    useEffect(() => {
        if (choice !== -1) {
            setCorrect(choice === answer);
        }
    }, [choice]);

    return (
        <div className="w-full">
            <div className="w-full bg-secondary-background p-4 rounded-lg min-h-[50vh] flex flex-col justify-between">
                <div className="pb-8">
                    <p className="text-gray-300">{provided}</p>
                    <p className="text-xl">{card[provided]}</p>
                </div>
                <div className="py-2">
                    {choice === -1 ? `Select the right ${ask}` : 'You selected ' + (choice === answer ? 'the right definition' : 'the wrong definition')}
                </div>
                <div className="w-full flex flex-col space-y-4">
                    {...choices}
                </div>
            </div>
        </div>
    );
}

export default MultipleChoice;
