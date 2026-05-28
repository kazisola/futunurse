"use client";
import { Button } from '@/components/ui/button';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { INCLEXQuestion } from '@/types/NCLEX';

interface QuestionProps {
    currentQuestion: INCLEXQuestion | null;
    onNextQuestion: () => void;
    currentQuestionIndex: number;
    sessionScores: number;
    setSessionScores: Dispatch<SetStateAction<number>>;
    questionsLength: number;
}

const Question = ({ currentQuestion, onNextQuestion, currentQuestionIndex, sessionScores, setSessionScores, questionsLength }: QuestionProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [submittedAnswer, setSubmittedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        setSelectedAnswer(null);
        setSubmittedAnswer(null);
        setShowResult(false);
    }, [currentQuestionIndex])

    const handleSubmitAnswer = () => {
        if (selectedAnswer !== null) {
            setSubmittedAnswer(selectedAnswer);
            setShowResult(true);
        }
        if (selectedAnswer === currentQuestion?.correctAnswer) {
            setSessionScores((prev) => prev + 1);
        }
    }
    if (!currentQuestion) return <div>Thinking...</div>
    return (
        <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-5">

            <h6 className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.question}
            </h6>

            <ul className="mt-7 space-y-3">
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = index === submittedAnswer;

                    let className =
                        "flex items-start gap-3 border px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer text-sm sm:text-base";

                    if (showResult) {
                        if (submittedAnswer === currentQuestion.correctAnswer) {
                            if (isCorrect)
                                className +=
                                    " bg-green-500/15 border-green-500/30";
                        } else {
                            if (isSelected)
                                className +=
                                    " bg-red-500/15 border-red-500/30 cursor-not-allowed";
                            if (isCorrect)
                                className +=
                                    " bg-green-500/15 border-green-500/30";
                        }
                    } else {
                        if (selectedAnswer === index)
                            className +=
                                " bg-teal-600 text-white border-teal-600";
                        else
                            className +=
                                " hover:bg-gray-50";
                    }

                    return (
                        <li
                            key={index}
                            onClick={() =>
                                !showResult && setSelectedAnswer(index)
                            }
                            className={className}
                        >

                            {showResult && isSelected &&
                                submittedAnswer === currentQuestion.correctAnswer && (
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500 mt-0.5"
                                    />
                                )}

                            {showResult && isSelected &&
                                submittedAnswer !== currentQuestion.correctAnswer && (
                                    <XCircle
                                        size={18}
                                        className="text-red-500 mt-0.5"
                                    />
                                )}

                            {showResult &&
                                submittedAnswer !== currentQuestion.correctAnswer &&
                                isCorrect && (
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500 mt-0.5"
                                    />
                                )}

                            <span className="font-medium">
                                {String.fromCharCode(65 + index)}.
                            </span>

                            <span className="flex-1">{option}</span>
                        </li>
                    );
                })}
            </ul>

            {showResult && (
                <div
                    className={`mt-8 border rounded-xl p-5 space-y-3 ${submittedAnswer === currentQuestion.correctAnswer
                        ? 'border-green-500/30 bg-green-500/10'
                        : 'border-red-500/30 bg-red-500/10'
                        }`}
                >
                    <h5
                        className={`font-semibold flex items-center gap-2 text-sm uppercase tracking-wide ${submittedAnswer === currentQuestion.correctAnswer
                            ? 'text-green-600'
                            : 'text-red-600'
                            }`}
                    >
                        {submittedAnswer === currentQuestion.correctAnswer ? (
                            <>
                                <CheckCircle2 size={18} /> Correct
                            </>
                        ) : (
                            <>
                                <XCircle size={18} /> Incorrect
                            </>
                        )}
                    </h5>

                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-600">
                            Reason
                        </p>
                        <p className="text-sm text-gray-900">
                            {currentQuestion.explanation}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-600">
                            Rationale
                        </p>
                        <p className="text-sm text-gray-900">
                            {currentQuestion.rationale}
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-7 flex justify-between sm:items-center max-sm:flex-col max-sm:gap-6">
                <p className="text-sm text-gray-700 font-medium max-sm:hidden">
                    Score: {sessionScores}/{currentQuestionIndex}
                </p>
                <p className='text-sm text-gray-700 font-medium flex items-center justify-between sm:hidden'><span>Score</span><span>{sessionScores}/{currentQuestionIndex}</span></p>

                {!showResult ? (
                    <Button
                        size="lg"
                        className={`rounded-full px-8 ${selectedAnswer === null
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                            }`}
                        onClick={handleSubmitAnswer}
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        className="rounded-full px-8"
                        onClick={onNextQuestion}
                    >
                        {currentQuestionIndex === questionsLength - 1
                            ? 'Finish Session'
                            : 'Next Question'}
                        <ArrowRight className="ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Question;