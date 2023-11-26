import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";

import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./ShortAnswer";
import LearnManager from "../../../utils/Managers/Study/LearnManager";
import SetManager from "../../../utils/SetManager";

function QuestionBox({ manager, roundCards, finishRound, increaseScore, decreaseScore, questionNumber, setQuestionNumber }) {
    const [correct, setCorrect] = useState(undefined);
    const [wrongCards, setWrongCards] = useState(undefined);
    const [questionSettings, setQuestionSettings] = useState({ type: LearnManager.MULTIPLE_CHOICE, ask: LearnManager.TERM });
    const { ssx } = useSSX();
    const setManager = new SetManager(ssx);

    useEffect(() => {
        setQuestionSettings(manager.processQuestion(roundCards[questionNumber]));
    }, [questionNumber, roundCards]);

    const nextQuestion = (event, override) => {
        event.preventDefault();

        const { id, level } = roundCards[questionNumber];

        if (correct || override) {
            manager.increaseLearn(id, level)
            increaseScore(id)
        } else {
            manager.decreaseLearn(id, level)
            decreaseScore(id)
        }

        setWrongCards(undefined);
        setCorrect(undefined);

        if (questionNumber + 1 > roundCards.length - 1) {
            finishRound(event);
            setQuestionNumber(0);
        } else {
            setQuestionNumber(questionNumber + 1);
        }
    };

    const overrideAnswer = (event) => {
        setCorrect(true);

        nextQuestion(event, true);
    };

    const generateQuestion = () => {
        const { type, ask } = questionSettings;

        if (type === LearnManager.MULTIPLE_CHOICE) {
            let wrong = wrongCards;
            if (!wrong) {
                wrong = manager.getWrongCards(roundCards[questionNumber].id);
                setWrongCards(wrong);
            }

            return <MultipleChoice key={questionNumber} ask={ask} wrongCards={wrong} card={roundCards[questionNumber]} setCorrect={setCorrect} />
        } else {
            return <ShortAnswer key={questionNumber} ask={ask} card={roundCards[questionNumber]} setCorrect={setCorrect} overrideAnswer={overrideAnswer} />
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[90%] pt-8 pb-2 text-xl">
                {questionNumber + 1}/{roundCards.length} Questions
            </div>
            <div className="w-[90%] py-2">
                {roundCards.length ? { ...generateQuestion() } : null}
            </div>
            {
                correct !== undefined ?
                    <div className="w-[90%]">
                        <button
                            className="w-full bg-primary-button p-2 rounded-lg my-4 text-lg hover:bg-primary-button/75"
                            onClick={nextQuestion}
                        >
                            {questionNumber + 1 <= roundCards.length - 1 ? 'Next Question' : 'Finish Round'}
                        </button>
                    </div> : null
            }
        </div>
    )
}

export default QuestionBox;
