import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";
import { useNavigate } from "react-router-dom"

import KeplerManager from "../../../utils/SetManager";
import QuizManager from "../../../utils/Managers/Study/QuizManager";
import Header from "./Header";
import QuestionBox from "./QuestionBox";
import Results from "./Results";
import { drugHippos } from "../../../utils/tools";

function Quiz({ set }) {
    const [options, setOptions] = useState(QuizManager.getDefaultOptions(set));
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const { ssx } = useSSX();
    const nav = useNavigate();
    const keplerManager = new KeplerManager(ssx);
    const quizManager = new QuizManager(questions, setQuestions, questionNumber, options, set.cards);

    useEffect(() => {
        quizManager.generateQuestions(set.cards);
        setQuestionNumber(0);
    }, [options]);

    const finish = () => {
        questions.forEach(question => {
            if (QuizManager.checkAnswer(question)) {
                keplerManager.increaseCardScore(set, question.card.id)
            } else {
                keplerManager.decreaseCardScore(set, question.card.id)
            }
        });

        setShowResults(true);
    }

    return (
        <div className={`w-[90%] max-w-[1296px] mx-auto py-4 flex flex-col items-center`}>
            <Header set={set} options={options} setOptions={setOptions} />
            {
                drugHippos(
                    <QuestionBox
                        manager={quizManager}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        finish={finish}
                    />,
                    !showResults,
                )
            }
            {
                drugHippos(
                    <Results questions={questions} manager={quizManager} />,
                    showResults,
                )
            }
        </div>
    );
}

export default Quiz;
