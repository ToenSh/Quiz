import { useState } from 'react';
import Answer from './Answer';
import { useNavigate } from 'react-router-dom';

interface QuestionProps {
  title: string;
  answers: string[];
  correctAnswers: number[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
  totalQuestions: number;
  type: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
}
export default function Question({
  title,
  answers,
  correctAnswers,
  setCurrentQuestion,
  currentQuestion,
  totalQuestions,
  type,
  score,
  setScore,
}: QuestionProps) {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  function handleScore() {
    if (
      type === 'single' &&
      selectedAnswers.length === 1 &&
      answers[correctAnswers[0]] === selectedAnswers[0]
    ) {
      console.log('SCORE INCREMENTED');
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

  function handleLastQuestion() {
    handleScore();
    setCurrentQuestion(0);
  }

  const answerElements = answers.map((answer, index) => {
    const letter = String.fromCharCode(65 + index);
    return (
      <Answer
        setSelectedAnswers={setSelectedAnswers}
        answer={answer}
        letter={letter}
        selectedAnswers={selectedAnswers}
        type={type}
      />
    );
  });

  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <span className="text-sm">Question {currentQuestion + 1}</span>
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
              handleLastQuestion();
              navigate('/result', { state: { score: score } });
            } else {
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
