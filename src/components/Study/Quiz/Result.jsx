import QuizManager from "../../../utils/Managers/Study/QuizManager";
import Quiz from "./Quiz";
import { drugHippos } from "../../../utils/tools";

function Result({ question, index, manager }) {
    const userAnswer = QuizManager.getUserAnswer(question);
    const correctAnswer = QuizManager.getCorrectAnswer(question);
    const isCorrect = QuizManager.checkAnswer(question);
    const borderColor = isCorrect ? "border-green-500" : "border-red-500";

    return (
        <div className={`border ${borderColor} my-4 rounded-lg`}>
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center">
                    <div className="text-lg font-semibold">Question {index + 1}</div>
                </div>
            </div>
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center">
                    <div className="text-lg font-semibold">Your Answer:</div>
                    <div className="ml-2">{userAnswer}</div>
                </div>
                <div className="flex items-center">
                    <div className="text-lg font-semibold">{isCorrect ? "Correct" : "Incorrect"}</div>
                </div>
            </div>
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center">
                    <div className="text-lg font-semibold">Correct Answer:</div>
                    <div className="ml-2">{correctAnswer}</div>
                </div>
            </div>
        </div>
    )
}

export default Result;
