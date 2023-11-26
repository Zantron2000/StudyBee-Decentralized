import QuizManager from "../../../utils/Managers/Study/QuizManager";
import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./ShortAnswer";
import TrueFalse from "./TrueFalse";

function QuestionBox({ manager, questionNumber, setQuestionNumber, finish }) {
    const question = manager.getQuestion(questionNumber);


    const increaseQuestionNumber = () => {
        if (questionNumber < manager.getTotalQuestions() - 1) {
            setQuestionNumber(questionNumber + 1);
        } else {
            finish();
        }
    }

    const decreaseQuestionNumber = () => {
        if (questionNumber > 0) {
            setQuestionNumber(questionNumber - 1);
        }
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-center">
                <div className="text-xl my-4">Question {questionNumber + 1}/{manager.getTotalQuestions()}</div>
            </div>
            <div className="w-full bg-secondary-background min-h-[75vh] rounded-xl p-4">
                {
                    question.type === QuizManager.MULTIPLE_CHOICE ?
                        <MultipleChoice question={question} manager={manager} />
                        : question.type === QuizManager.TRUE_FALSE ?
                            <TrueFalse question={question} manager={manager} />
                            : question.type === QuizManager.SHORT_ANSWER ?
                                <ShortAnswer question={question} manager={manager} />
                                : <p>Unknown Question Type</p>
                }
            </div>
            <div className="w-full flex justify-between px-2 py-4">
                <button
                    className="bg-primary-button py-2 w-1/4 rounded-xl hover:bg-primary-button/75 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={questionNumber === 0}
                    onClick={decreaseQuestionNumber}
                >
                    Back
                </button>
                <button
                    className="bg-primary-button py-2 w-1/4 rounded-xl hover:bg-primary-button/75 text-xl"
                    onClick={increaseQuestionNumber}
                >
                    {manager.isLastQuestion(questionNumber) ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    )
}

export default QuestionBox
