import { useState } from 'react';
import Answer from './Answer';

interface QuestionProps {
  title: string;
  answers: string[];
  correctAnswers: number[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
  setQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
  totalQuestions: number;
  type: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isQuizActive: boolean;
}
export default function Question({
  title,
  answers,
  correctAnswers,
  setCurrentQuestion,
  currentQuestion,
  setQuizFinished,
  totalQuestions,
  type,
  setScore,
  isQuizActive,
}: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  function handleScore() {
    if (
      type === 'single' &&
      answers[correctAnswers[0]] === selectedAnswers[0]
    ) {
      setScore((prevScore) => prevScore + 1);
    } else if (
      type === 'multiple' &&
      selectedAnswers.length === correctAnswers.length
    ) {
      for (let i = 0; i < correctAnswers.length; i++) {
        if (answers[correctAnswers[i]] !== selectedAnswers[i]) {
          return false;
        }
      }
      setScore((prevScore) => prevScore + 1);
    }
  }

  const answerElements = answers.map((answer, index) => {
    const letter = String.fromCharCode(65 + index);
    return (
      <Answer
        setSelectedAnswers={setSelectedAnswers}
        answer={answer}
        letter={letter}
      />
    );
  });

  const sliderWidth = ((currentQuestion + 1) / totalQuestions) * 100 + '%';

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl py-8 px-12 gap-8 w-[500px]">
      <div className="flex items-center gap-4">
        <div className="bg-gray-300 w-full h-4 rounded-lg width-transition">
          <div
            className={`bg-indigo-700 h-4 rounded-lg`}
            style={{ width: sliderWidth }}
          ></div>
        </div>
        <span className="text-sm">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>
      <div>
        <span className="text-sm">Question Number</span>
        <h1 className="font-bold text-lg">{title}</h1>
      </div>
      <div className="flex flex-col gap-4">{answerElements}</div>
      <div className="self-end flex gap-4">
        <button
          className=" bg-gray-300 text-black font-bold py-2 text-xs px-10 rounded"
          onClick={() =>
            setCurrentQuestion((prevCurrentQuestion) =>
              prevCurrentQuestion > 0 ? prevCurrentQuestion - 1 : 0
            )
          }
        >
          BACK
        </button>
        <button
          className=" bg-indigo-700 text-white font-bold py-2 text-xs px-10 rounded"
          onClick={() => {
            if (currentQuestion === totalQuestions - 1) {
              setQuizFinished(true);
              setCurrentQuestion(0);
            } else if (isQuizActive) {
              handleScore();
              setCurrentQuestion(
                (prevCurrentQuestion) => prevCurrentQuestion + 1
              );
            }
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
